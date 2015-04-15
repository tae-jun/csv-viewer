/// <reference path="../main.ts" />

module nav {
    export class LogListCtrl {

        constructor($scope, logService:common.LogService, $mdSidenav) {
            // Get log file names
            logService.list()
                .then((data)=> {
                    $scope.logNames = data;
                });

            $scope.closeMenu = ()=> {
                $mdSidenav('left').close();
            };
        }
    }

    registerController('logListCtrl', LogListCtrl);
}