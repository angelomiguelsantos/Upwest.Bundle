var dateRangePickerFormat = "d-m-Y";
(function () {
    'use strict';

    function multiDatePickerController($http, $scope, $routeParams, assetsService,userService) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        var localeScript = ""; 

        if ($routeParams.section === 'settings') {
            return;
        }

        var user = userService.getCurrentUser().then(function (user) {
            if (user.locale != "en-US") {                
                localeScript = "~/App_Plugins/upwest.bundle/upwest.multidatepicker/dependencies/locales/bootstrap-datepicker." + user.locale.slice(0, 2) + ".min.js";
            }

            assetsService
                .load([                    
                    "~/App_Plugins/upwest.bundle/upwest.multidatepicker/dependencies/bootstrap-datepicker.min.js",
                    localeScript
                ])
                .then(function () {
                    setTimeout(() => {
                        $('#' + vm.alias).datepicker({
                            multidate: true,
                            todayHighlight: true,
                            language: user.locale.slice(0, 2),
                            format: $scope.model.config.format.toLowerCase(),
                            calendarWeeks: $scope.model.config.calendarWeeks == 1 ? true : false,
                            multidateSeparator: ",",
                            todayBtn: $scope.model.config.todayBtn == 1 ? true : false,
                            clearBtn: $scope.model.config.clearBtn == 1 ? true : false
                        });
                    }, "1");
                });
        });

        vm.iconClick = iconClick;

        function iconClick() {
            $('#' + vm.alias).focus();
        }



    }

    angular.module('umbraco').controller('multiDatePicker', multiDatePickerController);

})();








