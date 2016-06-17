function Config($stateProvider) {
	$stateProvider
	.state('summary', {
		url: '/',
		templateUrl: 'app/views/summary/summary.html',
		controller: 'DeficiencySummaryController as dsc',
		params: {
			prev_state_values: {}
		}
	});
}

function DeficiencySummaryController($timeout, $rootScope, $state, $stateParams, Data, _){
	var dsc = this;
	dsc.rsc = $rootScope;

	if (Data.all_data) {
		dsc.tiles = Data.metrics;
	}
	else {
		$rootScope.$on('Data:initial', function(e, initial_data) {
			$rootScope.$apply(function(){
				dsc.tiles = initial_data;
			});
		});
	}
		

	dsc.goToDetail = function(item) {
		$state.go('detail', {
			cap: item['CAP #'],
			week: item.Week,
			cap_item: item,
			prev_state_values: {
				weekfilter: dsc.weekfilter,
				order: dsc.order
			}
		});
	};
}

angular.module('cmsEntry')
.config(Config)
.controller('DeficiencySummaryController', DeficiencySummaryController);