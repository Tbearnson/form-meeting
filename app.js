(function (app){
	function Config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
	}

	app
	.config(Config)
	.constant('_', _)
	.constant('domo', domo);
})(angular.module('cmsEntry',['ui.router','ui.bootstrap','angular.filter','ngAnimate', 'utilities']));