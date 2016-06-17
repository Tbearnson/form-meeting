function clickOutside($document, $parse, $timeout) {
    return {
        restrict: 'A',
        link: function($scope, elem, attr) {

            // Postpone linking to next digest to allow for unique id generation
            $timeout(function() {
                var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.split(/[ ,]+/) : [],
                    fn;

                // Add the elements id so it is not counted in the click listening
                if (attr.id !== undefined) {
                    classList.push(attr.id);
                }

                function eventHandler(e) {
                    var i, element, r, id, classNames, l;

                    // Check if our element already hidden and abort if so
                    if (angular.element(elem).hasClass("ng-hide")) {
                        return;
                    }

                    // If there is no click target, no point going on
                    if (!e || !e.target) {
                        return;
                    }

                    // Loop through the available elements, looking for classes in the class list that might match and so will eat
                    for (element = e.target; element; element = element.parentNode) {
                        id = element.id;
                        classNames = element.className;
                        l = classList.length;

                        // Unwrap SVGAnimatedString classes
                        if (classNames && classNames.baseVal !== undefined) {
                            classNames = classNames.baseVal;
                        }

                        // If there are no class names on the element clicked, skip the check
                        if (classNames || id) {
                            // Loop through the elements id's and classnames looking for exceptions
                            for (i = 0; i < l; i++) {
                                // Prepare regex for class word matching
                                r = new RegExp('\\b' + classList[i] + '\\b');

                                // Check for exact matches on id's or classes, but only if they exist in the first place
                                if ((id !== undefined && id === classList[i]) || (classNames && r.test(classNames))) {
                                    // Now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                    return;
                                }
                            }
                        }
                    }

                    // If we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                    $scope.$apply(function() {
                        fn = $parse(attr['clickOutside']);
                        fn($scope);
                    });
                }

                // If the device has a touchscreen, listen for this event
                if (_hasTouch()) {
                    $document.on('touchstart', eventHandler);
                }

                // Still listen for the click event even if there is touch to cater to touchscreen laptops
                $document.on('click', eventHandler);

                // When the scope is destroyed, clean up the document's event handlers as we don't want them hanging around
                $scope.$on('$destroy', function() {
                    if (_hasTouch()) {
                        $document.off('touchstart', eventHandler);
                    }

                    $document.off('click', eventHandler);
                });

                // Private function to attempt to figure out if we are on a touch device
                function _hasTouch() {
                    // Works on most browsers, IE10/11 and Surface
                    return 'ontouchstart' in window || navigator.maxTouchPoints;
                };
            });
        }
    };
}

angular.module('utilities')
.directive('clickOutside', ['$document', '$parse', '$timeout', clickOutside])