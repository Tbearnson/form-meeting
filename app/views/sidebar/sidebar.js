function sidebar() {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/views/sidebar/sidebar.html',
		controller: 'SidebarController as sc'
	};
}

function SidebarController($rootScope, Data) {
	var sc = this;
	sc.rsc = $rootScope;

	$rootScope.$on('Data:initial', function(e, initial_data) {
		sc.tiles = initial_data;
		sc.weeks = _(sc.tiles).map(function(item){return item.Week;}).uniq().value();
		
		sc.rsc.weekfilter = _.maxBy(sc.tiles, 'Week').Week;
		sc.rsc.order = 'CAP';
		sc.rsc.monitor = 'All';
	})

	sc.changeWeekFilter = function(week) {
		console.log('IGGILIES:', week);
		$rootScope.$broadcast('Sidebar:weekfilter', week);
	};
}

angular.module('cmsEntry')
.directive('sidebar', sidebar)
.controller('SidebarController', SidebarController);