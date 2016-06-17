function Config($stateProvider) {
	$stateProvider
	.state('detail', {
		url: '/detail/:cap/week/:week',
		templateUrl: 'app/views/detail/detail.html',
		controller: 'DeficiencyDetailsController as ddc',
		params: {
			cap: '',
			week: '',
			cap_item: {},
			prev_state_values: {}
		}
	});
}

function DeficiencyDetailsController($rootScope, $state, $stateParams, Data){
	var ddc = this;
	console.log($stateParams);
	// Assign a value to ddc.data (whether or not we actually went to the summary page first)
	if ($stateParams.cap_item['CAP #']) ddc.data = $stateParams.cap_item;
	else Data.getAllData()
		.then(function(all_data) {
			ddc.data = all_data.filter(function(item) {
				return item['CAP #'] === $stateParams.cap && item.Week === $stateParams.week;
			})[0];
		});

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