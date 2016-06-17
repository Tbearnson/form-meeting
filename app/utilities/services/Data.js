function Data($http, $q, $rootScope, domo) {
	var the_data = {};

	the_data.getAllData = function() {
		if (!the_data.all_data) {
			return domo.get('/data/v1/capmetrics')
				.then(function(result) {
					the_data.metrics = result;
					return domo.get('/data/v1/captasks');
				})
				.then(function(result) {
					the_data.tasks = result;
					the_data.all_data = the_data.metrics.map(function(metric) {
						// Add in the tasks data for each CAP item
						metric.Tasks = the_data.tasks.filter(function(task) {
							return task['CAP #'] == metric['CAP #'] && 
								   task.Week == metric.Week;
						});

						// Groom the CAP #
						metric['CAP #'] = metric['CAP #'].split(' ')[0];

						// Determine the status of each CAP item
						metric.Status = metric['Error Rate'] ? (metric['Error Rate'] <= metric['Short Term Error Rate'] ? 'Green' : 'Red') : 'Yellow';

						return metric;
					});

					// Notify controllers that data is available
					$rootScope.$broadcast('Data:initial', the_data.all_data);

					return the_data.all_data;
				});
		}
		else {
			// Promisify return of cached data to simplify API for controllers
			var deferred = $q.defer();
			deferred.resolve(the_data.all_data);
			return deferred.promise;
		}
	};

	the_data.getAllData();
	return the_data;
}

angular.module('cmsEntry')
.factory('Data', Data);