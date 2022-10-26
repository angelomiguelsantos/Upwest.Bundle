(function () {
    'use strict';

    function textareaController($scope, $routeParams) {

        if ($routeParams.section === 'settings') {
            return;
        }

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;
        vm.icon = $scope.model.config.icon;
        vm.maxLength = $scope.model.config.maxLength; 
        vm.rows = $scope.model.config.rows; 
    }

    angular.module('umbraco').controller('upwest.textarea', textareaController);

})();








