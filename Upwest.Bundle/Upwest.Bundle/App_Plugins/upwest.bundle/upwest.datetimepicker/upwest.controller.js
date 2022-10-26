(function () {
    'use strict';

    function datetimePickerController($scope, userService) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        vm.icon = "glyphicon glyphicon-calendar";
        var pickerFormat = $scope.model.config.format;
        $("#" + vm.alias).val($scope.model.value);

        if ($scope.model.config.onlyTimepicker == 1) {            
            pickerFormat = $scope.model.config.withSeconds == 1 ? "HH:mm:ss A" : "hh:mm A";
            vm.icon = "glyphicon glyphicon-time";
        }
        else {
            pickerFormat = $scope.model.config.withSeconds == 1 ? pickerFormat + " hh:mm:ss A" : pickerFormat + " hh:mm A";
        }

        if ($scope.model.config.timePicker24Hours == 1) {
            pickerFormat = pickerFormat.replace("hh:mm A", "HH:mm").replace("hh:mm:ss A", "HH:mm:ss").replace("HH:mm:ss A", "HH:mm:ss");
        }

        userService.getCurrentUser().then(function (user) {
            setTimeout(() => {
                $('#' + vm.alias).datetimepicker({
                    format: pickerFormat,                
                    inline: false,
                    sideBySide: false,
                    locale: user.locale
                });
            }, 100);
        });

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });
    }

    angular.module('umbraco').controller('datetimePicker', datetimePickerController);

})();




        

        

        