function Config($stateProvider) {
	$stateProvider
	.state('detail', {
		url: '/detail/:cap_plus_deficiency',
		templateUrl: 'app/views/detail/detail.html',
		controller: 'DeficiencyDetailsController as ddc',
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