/// <reference path="../main.ts" />

module views.log {
    export class LogViewCtrl {

        constructor($scope, nodes:any, toolbarService:toolbar.ToolbarService, $routeParams) {
            var logName = $routeParams.logName;
            // Set toolbar title
            toolbarService.setTitle(logName);

            console.log('LogViewCtrl', 'loaded');
            console.log('nodes', nodes);

            $scope.nodes = nodes;
            $scope.logName = logName;

            $scope.selectNode = (node)=> {
                //node.sensors.forEach((sensor:any)=> {
                //    sensor.log.forEach((record:any)=> {
                //        if (typeof record.date == 'string')
                //            record.date = new Date(record.date).toLocaleTimeString();
                //    })
                //});

                if ($scope.selectedNode == node.name)
                    return $scope.selectedNode = null;
                $scope.selectedNode = node.name
            };


            //$scope.nodes.forEach((node)=>{
            //    node.sensors.forEach((sensor)=>{
            //        //console.log(sensor.log.length)
            //        if(sensor.log.length==1238)
            //        sensor.log.forEach((record)=>{
            //            console.log(record.value)
            //        })
            //    })
            //})
        }
    }

    registerController('logViewCtrl', LogViewCtrl);
}