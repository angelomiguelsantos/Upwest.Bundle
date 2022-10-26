(function () {
    'use strict';
    function tabsController($http, $scope ) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.tabs = [];
        $("#" + vm.alias).val($scope.model.value);
        $scope.retreivetabs = function () {
            $http.get("/umbraco/backoffice/api/MemberAuthorized/GetTabs").then(function (data) {
                vm.tabs = data.data;
            });
        };

        $scope.retreivetabs();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.tabs', tabsController);
})();





















