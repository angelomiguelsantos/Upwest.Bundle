(function () {
    'use strict';
    function dataTypesController($http, $scope, assetsService) {

        var vm = this;
        vm.alias = $scope.model.alias;
        $("#" + vm.alias).val($scope.model.value);
        $scope.dataTypes = [];
        $scope.retreivedataTypes = function () {
            $http.get("/umbraco/backoffice/api/CheckboxList/GetdataTypes").then(function (data) {
                $scope.dataTypes = data.data;
            });
        };

        $scope.retreivedataTypes();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });
    }

    angular.module('umbraco').controller('upwest.dataTypes', dataTypesController);

})();