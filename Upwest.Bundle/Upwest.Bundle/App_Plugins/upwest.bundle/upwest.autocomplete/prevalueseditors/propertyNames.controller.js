(function () {
    'use strict';
    function propertyNamesController($http, $scope, assetsService) {

        var vm = this;
        vm.alias = $scope.alias;
        $scope.propertyNames = [];

        $scope.retreiveProperties = function () {
            $http.get("/umbraco/backoffice/api/Autocomplete/GetProperties").then(function (data) {
                $scope.propertyNames = data.data;
            });
        };

        $scope.retreiveProperties();

        $scope.$on("formSubmitting", function () {            
            $scope.model.value = $("#" + vm.alias).val();
        });
    }
    angular.module('umbraco').controller('upwest.propertyNames', propertyNamesController);
})();





















