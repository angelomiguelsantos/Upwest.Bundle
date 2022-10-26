(function () {
    'use strict';

    function textboxController($scope) {
        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;
        vm.icon = $scope.model.config.icon;
        vm.maxLength = $scope.model.config.maxLength; 
    }

    angular.module('umbraco').controller('upwest.textbox', textboxController);

})();








