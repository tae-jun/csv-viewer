/// <reference path="../main.ts"/>

module common {
    export class ProgressService {
        private tpl:JQuery;

        constructor($compile:ng.ICompileService,
                    $rootScope:ng.IRootScopeService) {

            this.tpl = $compile('<md-progress-linear class="pgs"\
            md-mode="indeterminate">\
            </md-progress-linear>')($rootScope);
        }

        show():void {
            $('body').append(this.tpl);
        }

        hide():void {
            this.tpl.remove();
        }
    }

    registerService('progressService', ProgressService);
}