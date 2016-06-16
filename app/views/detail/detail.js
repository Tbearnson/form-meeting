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
function DeficiencyDetailsController($state, $stateParams, Data){
	var ddc = this;

	ddc.pageTitle = "CMS Details"
	ddc.tiles = Data.tiles;
	ddc.data = ddc.tiles.filter(function(item){return item.CAP === $stateParams.cap_plus_deficiency;})[0];

	ddc.goToSummary = function(){
		$state.go('summary', {
			state_values: $stateParams.prev_state_values,
			prev_state_values: {

			}
		});
	};
}

angular.module('cmsEntry')
.config(Config)
.controller('DeficiencyDetailsController', DeficiencyDetailsController);