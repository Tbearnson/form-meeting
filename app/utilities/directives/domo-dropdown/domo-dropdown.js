function domoDropdown() {
	return {
		restrict: "E",
		templateUrl: "app/utilities/directives/domo-dropdown/domo-dropdown.html",
		scope: {},
		controller: 'domoDropdownController as ddc',
		bindToController: {
			placeholder: "@",
			list: "=",
			selected: "=",
			property: "@"
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