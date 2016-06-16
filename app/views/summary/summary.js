function Config($stateProvider) {
	$stateProvider
	.state('detail', {
		url: '/detail/:cap_plus_deficiency',
		templateUrl: 'app/views/detail/detail.html',
		controller: 'DeficiencySummaryController as dsc',
		params: {
			prev_state_values: {}
		}
	});
}
function DeficiencySummaryController($state, $stateParams, Data, _){
	var dsc = this;
	dsc.pageTitle = "CMS Entry";
	dsc.tiles = Data.tiles;
	dsc.weekfilter = _.maxBy(dsc.tiles, 'Week').Week;
	dsc.order = 'CAP';
	dsc.monitor = 'All';
	dsc.status = {
		isopen: false
	};

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