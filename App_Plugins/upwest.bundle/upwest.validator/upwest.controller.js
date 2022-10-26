(function () {
    'use strict';

    function ValidatorController($scope) {

		var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
		vm.message = $scope.model.validation.mandatoryMessage;
    }

    angular.module('umbraco').controller('Validator', ValidatorController);

})();








