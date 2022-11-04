(function () {
    'use strict';
    function languagesController($http, $scope, assetsService) {

        var vm = this;
        vm.alias = $scope.model.alias;
        $("#" + vm.alias).val($scope.model.value);
        $scope.languages = [];
        $scope.retreivelanguages = function () {
            $http.get("/umbraco/backoffice/api/DropdownList/GetLanguages").then(function (data) {
                $scope.languages = data.data;
            });
        };

        $scope.retreivelanguages();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });
    }

    angular.module('umbraco').controller('upwest.languages', languagesController);

})();