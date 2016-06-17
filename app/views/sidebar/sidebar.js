function sidebar($document) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'app/views/sidebar/sidebar.html',
		controller: 'SidebarController as sc',
		link: function(scope, element, attr, ctrl) {
			// Close element if click isn't on the icon or the menu itself
			$document.bind('click', function(event){
				console.log(event.target);
				var isClickedElementChildOfSlideout = $('div.slideout-menu')
					.find(event.target)
					.length > 0;
				var isClickedElementSlideoutIcon = $('div#optionsDrawerBtn')
					.find(event.target)
					.length > 0;

				if (!$(event.target).is('div.slideout-menu') && 
					!isClickedElementChildOfSlideout && 
					!isClickedElementSlideoutIcon
					) {
					scope.$apply(function(){
						ctrl.show = false;
					});
				}
			});
		}
	};
}

function SidebarController($rootScope, $state, Data) {
	var sc = this;
	sc.rsc = $rootScope;

	$rootScope.$on('Data:initial', function(e, initial_data) {
		sc.tiles = initial_data;
		sc.weeks = _(sc.tiles).map(function(item){return item.Week;}).uniq().value();

		sc.rsc.weekfilter = _.maxBy(sc.tiles, 'Week').Week;
		sc.rsc.order = 'CAP';
		sc.rsc.monitor = 'All';
	});
	sc.state = $state.current.name;
	$rootScope.$watch(function(){return $state.current.name}, function(new_val, old_val) {
		sc.state = $state.current.name;
	});

	sc.hideSidebar = function() {
		console.log('BUBBLES');
		sc.show = false;
	};
	
}

angular.module('cmsEntry')
.directive('sidebar', sidebar)
.controller('SidebarController', SidebarController);