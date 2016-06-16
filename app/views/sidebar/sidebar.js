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

	sc.tiles = Data.tiles;
	console.log(sc.tiles);
	sc.rsc.weekfilter = _.minBy(sc.tiles, 'Week').Week;
	sc.rsc.order = 'CAP';
	sc.rsc.monitor = 'All';
}

angular.module('cmsEntry')
.directive('sidebar', sidebar)
.controller('SidebarController', SidebarController);