/// <reference path="./toolbar/main.ts" />
/// <reference path="./common/main.ts" />
/// <reference path="./nav/main.ts" />
/// <reference path="./views/main.ts" />

var dependencies =
    [
        'ngRoute',
        'ngMaterial',
        'toolbar',
        'common',
        'nav',
        'views'
    ];

var app = angular.module('hcc', dependencies)

    .config(($routeProvider:ng.route.IRouteProvider) => {
        $routeProvider

            .when('/', {
                template: '<div>List</div>'
            })

            .when('/log/:logName', {
                templateUrl: 'tpl/log.view.tpl.html',
                controller: 'logViewCtrl',
                resolve: {
                    nodes: ($route, logService:common.LogService, progressService:common.ProgressService, $mdToast)=> {
                        var logName = $route.current.params.logName;
                        // Show progress bar
                        progressService.show();
                        // Pop toast
                        var toast = $mdToast.show(
                            $mdToast.simple()
                                .content('Fetching ' + logName + '...')
                                .position('right bottom')
                                .hideDelay(2000)
                        );

                        return logService.getLog(logName)
                            .finally(()=> {
                                progressService.hide();
                                $mdToast.hide();
                            });
                    }
                }
            })

            .otherwise({
                redirectTo: '/'
            });
    })

    .run(($window) => {

    });

