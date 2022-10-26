(function () {
    'use strict';
    function templatesController($http, $scope, assetsService) {

        $scope.Alias = "ddlTemplates";
        $scope.templates = [];
        $scope.retreivetemplates = function () {
            $http.get("/umbraco/backoffice/api/MemberAuthorized/GetEmailTemplates").then(function (data) {
                $scope.templates = data.data;
            });
        };

        $scope.retreivetemplates();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + $scope.Alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.Templates', templatesController);
})();





















