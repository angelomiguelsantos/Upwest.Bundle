(function () {
    'use strict';
    function contentTypesController($http, $scope, assetsService) {

        var vm = this;
        vm.alias = $scope.alias;

        $scope.contentTypes = [];
        $scope.retreiveContentTypes = function () {
            $http.get("/umbraco/backoffice/api/Autocomplete/GetContentTypes").then(function (data) {
                $scope.contentTypes = data.data;
            });
        };

        $scope.retreiveContentTypes();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.ContentTypes', contentTypesController);
})();





















