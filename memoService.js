angular.module('memo')
    .service("MemoService", ["$http", function ($http) {
        var memoService = this;

        memoService.getChampions = function () {
            return $http.get('./champions.json');
        }

        memoService.shuffle = function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
        }

        return memoService;
    }]);