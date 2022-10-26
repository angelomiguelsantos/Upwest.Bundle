(function () {
    'use strict';
    function contentsController($http, $scope) {


        var vm = this;
        vm.alias = $scope.model.alias;
        vm.contents = [];
        $("#" + vm.alias).val($scope.model.value);
        $scope.retreivecontents = function () {
            $http.get("/umbraco/backoffice/api/MemberAuthorized/GetPublishedContents").then(function (data) {                       
                vm.contents = data.data;
            });
        };

        $scope.retreivecontents();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.contents', contentsController);
})();





















