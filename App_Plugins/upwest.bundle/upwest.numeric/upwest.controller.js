(function () {
    'use strict';

    function numericController($scope,$routeParams) {
        var vm = this;

        if ($routeParams.section === 'settings') {
            return;
        }


        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;
        vm.icon = $scope.model.config.icon;        
        vm.step = $scope.model.config.step;        
        vm.max = $scope.model.config.max;        
        vm.min = $scope.model.config.min;        
        setTimeout(() => {
            $("#" + vm.alias).val($scope.model.value);
        }, 100);
    }

    angular.module('umbraco').controller('upwest.numeric', numericController);

})();








