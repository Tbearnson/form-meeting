function domoDropdown($document) {
	return {
		restrict: "E",
		templateUrl: "app/utilities/directives/domo-dropdown/domo-dropdown.html",
		scope: {},
		controller: 'domoDropdownController as ddc',
		bindToController: {
			header: "@",
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@"
		},
		link: function(scope, element, attr, ctrl) {
			$document.bind('click', function(event){
				var isClickedElementChildOfDropdown = element
					.find(event.target)
					.length > 0;

				if (isClickedElementChildOfDropdown) return;
				else {
					scope.$apply(function(){
						ctrl.listVisible = false;
					});
				}
			});
		}
	};
}
function domoDropdownController() {
	var ddc = this;

	ddc.listVisible = false;

	ddc.select = function(item) {
		ddc.selected = item;
		ddc.listVisible = false;
		ddc.display = true;
		console.log('stuff', ddc.selected);

	};

	ddc.isSelected = function(item) {
		return item[ddc.property] === ddc.selected[ddc.property];
	};

	ddc.toggle = function() {
		ddc.listVisible = !ddc.listVisible;
	};
}

angular.module('utilities')
.directive('domoDropdown', domoDropdown)
.controller('domoDropdownController', domoDropdownController);