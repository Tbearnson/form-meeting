function categoryFilter(_) {
	return function(input, comparator, catchall) {
		if (input) {
			if ( _.isEqual(comparator,catchall) ) return input;
			return input.filter(function(item) {
				return _.max(_(comparator).keys().map(function(comp_item) {
					return comparator[comp_item] === item[comp_item];
				}).value());
			});
		}
	}
}

angular.module('utilities')
.filter('categoryFilter', categoryFilter);