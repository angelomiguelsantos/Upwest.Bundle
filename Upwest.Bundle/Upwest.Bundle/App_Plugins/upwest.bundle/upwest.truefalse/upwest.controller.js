(function () {
    'use strict';
    function truefalseController($scope, $routeParams) {

        if ($routeParams.section === 'settings') {
            return;
        }

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;

        var isTrueSet = ($scope.model.value.toLowerCase() === 'true');

        setTimeout(() => {
            $("#" + vm.alias).prop('checked', isTrueSet);
        }, 100);

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).prop('checked');
        });
    }

    angular.module('umbraco').controller('upwest.truefalse', truefalseController);

})();








