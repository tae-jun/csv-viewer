/// <reference path="../main" />

module toolbar {
    export class ToolbarCtrl {
        constructor($scope:any, $mdBottomSheet, $mdSidenav) {

            $scope.openMenu = ()=> {
                $mdSidenav('left').open();
            };

            $scope.$on('toolbarService:setTitle', (event, titles) => {
                $scope.titles = titles
            });
        }
    }

    registerController('toolbarCtrl', ToolbarCtrl);
}
