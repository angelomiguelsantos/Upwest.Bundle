(function () {
    'use strict';
    function rolesController($http, $scope, assetsService) {

        $scope.Alias = "ddlroles";
        $scope.roles = [];
        $scope.retreiveroles = function () {
            $http.get("/umbraco/backoffice/api/MemberAuthorized/GetRoles").then(function (data) {
                $scope.roles = data.data;
            });
        };

        $scope.retreiveroles();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + $scope.Alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.roles', rolesController);
})();





















