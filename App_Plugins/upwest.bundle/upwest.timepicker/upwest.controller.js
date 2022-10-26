(function () {
    'use strict';

    function timePickerController($http, $scope, $routeParams, assetsService, userService) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;

        var timeMode = '24hr';
        if ($scope.model.config.shortTime == 1) {
            timeMode = 'ampm';
        }

        setTimeout(function () {
            new GijgoTimePicker(document.getElementById(vm.alias), {
                mode: timeMode,
                format: $scope.model.config.format,
                uiLibrary: 'bootstrap',
                value: $scope.model.value,
                width: 150
            });
        }, 100);       
    }

    angular.module('umbraco').controller('timePicker', timePickerController);

})();






