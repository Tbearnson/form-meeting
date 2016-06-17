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

	Data.getAllData()
	.then(function(all_data) {
		$rootScope.$apply(function() {
			dsc.rsc.tiles = all_data;
		});
	});

	dsc.goToDetail = function(cap_def) {
		$state.go('detail', {
			cap_plus_deficiency: cap_def,
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