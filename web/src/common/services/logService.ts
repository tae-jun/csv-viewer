/// <reference path="../main.ts"/>

module common {
    export class LogService {
        private $http:ng.IHttpService;
        private $q:ng.IQService;

        constructor($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }

        list():ng.IPromise<any> {
            return this.requestGet('/log');
        }

        getLog(logName:string):ng.IPromise<any> {
            return this.requestGet('/log/' + logName);
        }

        requestGet(url:string):ng.IPromise<any> {
            var deferred = this.$q.defer();

            this.$http.get(url)
                .success((res:any)=> {
                    if (res.err)
                        return deferred.reject(res.msg);

                    deferred.resolve(res.data);
                })
                .error((err)=> {
                    console.error(err);
                    deferred.reject('logService: HTTP GET failure');
                });

            return deferred.promise;
        }
    }

    registerService('logService', LogService);
}