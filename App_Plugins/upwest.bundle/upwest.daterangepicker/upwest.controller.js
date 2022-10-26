(function () {
    'use strict';

    function dateRangepickerController($http, $scope, assetsService, $routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        $scope.loading = true;        

        var value = $scope.model.value;        

        if ($routeParams.section === 'settings') {
            $scope.loading = false;
            $('.input-group').show();
            return;
        }

        var startDate = moment().format($scope.model.config.dateFormat);
        var endDate = moment().format($scope.model.config.dateFormat);

        if (value != '') {
            var values = value.split(' - ');
            if (values.length == 2) {
                startDate = values[0] === "Invalid date" ? startDate : values[0];
                endDate = values[1] === "Invalid date" ? endDate : values[1];
            }
        }

        assetsService
            .load([
                "~/App_Plugins/upwest.bundle/upwest.daterangepicker/dependencies/daterangepicker.js"
            ])
            .then(function () {                

                $scope.retreiveDateRangePickerData = function () {
                    
                        $http({
                            url: "/umbraco/backoffice/api/DateRangePicker/GetData",
                            method: "GET",
                            params: {
                                translate: $scope.model.config.translate == 1 ? "true" : "false"
                            },
                            cache: false
                        }).then(function success(data) {

                            var range;
                            var trans = data.data.translations;
                            var secondsFormat = ''
                            var minutesFormat = ''

                            if ($scope.model.config.timePickerSeconds == 1) {
                                secondsFormat = ":ss";
                            }

                            if ($scope.model.config.timePicker == 1) {
                                minutesFormat = " HH:mm";
                            }

                            if ($scope.model.config.ranges == 1) {

                                range = {
                                    [trans.TODAY] : [moment(), moment()],
                                    [trans.YESTERDAY]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                    [trans.LAST7DAYS]: [moment().subtract(6, 'days'), moment()],
                                    [trans.LAST30DAYS]: [moment().subtract(29, 'days'), moment()],
                                    [trans.THISMONTH]: [moment().startOf('month'), moment().endOf('month')],
                                    [trans.LASTMONTH]: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                };
                            }

                            $('#' + vm.alias).daterangepicker({
                                showDropdowns: $scope.model.config.showdropdowns == 1 ? true : false,
                                singleDatePicker: $scope.model.config.singleDatePicker == 1 ? true : false,
                                minYear: 1000,
                                maxYear: 3000,
                                showWeekNumbers: $scope.model.config.showweeknumbers == 1 ? true : false,                                
                                timePicker: $scope.model.config.timePicker == 1 ? true : false,
                                timePicker24Hour: $scope.model.config.timePicker24Hours == 1 ? true : false,
                                timePickerIncrement: $scope.model.config.timePickerIncrement,
                                timePickerSeconds: $scope.model.config.timePickerSeconds == 1 ? true : false,
                                autoApply: $scope.model.config.autoApply == 1 ? true : false,
                                linkedCalendars: $scope.model.config.linkedCalendars == 1 ? true : false ,
                                maxSpan: {
                                    days: $scope.model.config.maxSpan
                                },
                                ranges: range,
                                locale: {
                                    format: $scope.model.config.dateFormat + minutesFormat + secondsFormat,
                                    separator: " - ",
                                    applyLabel: '<i class="fa fa-check"></i>',
                                    cancelLabel: '<i class="fa fa-times"></i>',
                                    fromLabel: trans.FROM,
                                    toLabel: trans.TO,
                                    customRangeLabel: trans.SELECTRANGE,
                                    weekLabel: "#",
                                    daysOfWeek: trans.DAYS,
                                    monthNames: trans.MONTHS,
                                    firstDay: 1
                                },
                                minDate: moment($scope.model.config.minDate, $scope.model.config.dateFormat),
                                maxDate: moment($scope.model.config.maxDate, $scope.model.config.dateFormat),
                                startDate: moment(startDate, $scope.model.config.dateFormat),
                                endDate: moment(endDate, $scope.model.config.dateFormat),
                                buttonClasses: "btn",
                                applyButtonClasses: "btn",
                                cancelClass: "btn",
                                drops: "auto",
                                opens: "left",
                                alwaysShowCalendars: $scope.model.config.alwaysShowCalendars == 1 ? true : false
                            });

                            var width = 800;
                            var rangesWith = 0;
                            var showweeknumbers = 0;

                            if ($scope.model.config.ranges == 1) {
                                rangesWith  = 129;                                
                            }
                            if ($scope.model.config.showweeknumbers == 1) {
                                showweeknumbers = 41;
                            }                            

                            $(".upwestDaterangepicker").width(parseInt(width + rangesWith + showweeknumbers));

                            $('.input-group').width(800);
                            $('.input-group').show();                            

                            $scope.loading = false;
                        });
                };

                $scope.retreiveDateRangePickerData();

            });

        vm.iconClick = iconClick;

        function iconClick() {
            $('#' + vm.alias).click();
        }
    }

    angular.module('umbraco').controller('dateRangepicker', dateRangepickerController);

})();




        

        

        