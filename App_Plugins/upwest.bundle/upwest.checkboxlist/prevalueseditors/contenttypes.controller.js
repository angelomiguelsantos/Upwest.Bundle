(function () {
    'use strict';
    function contentTypesController($http, $scope) {

        var vm = this;
        vm.alias = $scope.model.alias;
        $("#" + vm.alias).val($scope.model.value);
        $scope.contentTypes = [];
        $scope.retreiveContentTypes = function () {
            $http.get("/umbraco/backoffice/api/CheckboxList/GetContentTypes").then(function (data) {
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





















