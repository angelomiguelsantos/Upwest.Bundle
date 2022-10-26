(function () {
    'use strict';
    function memberTypesController($http, $scope ) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.memberTypes = [];
        $("#" + vm.alias).val($scope.model.value);
        $scope.retreivememberTypes = function () {
            $http.get("/umbraco/backoffice/api/MemberAuthorized/GetMemberTypes").then(function (data) {
                vm.memberTypes = data.data;
            });
        };

        $scope.retreivememberTypes();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.memberTypes', memberTypesController);
})();





















