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

function DeficiencySummaryController($rootScope, $state, $stateParams, Data, _){
	var dsc = this;
	dsc.rsc = $rootScope;

	dsc.tiles = Data.tiles;

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