(function () {
    'use strict';

    function inputMaskController($http, $scope, assetsService, $routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        vm.icon = "glyphicon glyphicon-pencil";
        var symbolPrefix;
        var symbolSuffix;

        if ($routeParams.section === 'settings') {            
            return;
        }

        assetsService
            .load([
                "~/App_Plugins/upwest.bundle/upwest.inputmask/dependencies/jquery.inputmask.bundle.min.js",
                "~/App_Plugins/upwest.bundle/upwest.inputmask/dependencies/jquery.maskMoney.min.js"
            ])
            .then(function () {
                
                $http.get("/umbraco/backoffice/api/InputMask/GetData")
                    .then(function success(data) {

                        var clearincomplete = false;
                        if ($scope.model.config.clearincomplete == 1) {
                            clearincomplete = true;
                        }

                        if (typeof $scope.model.config.symbolPrefix !== 'undefined') {
                            symbolPrefix = $scope.model.config.symbolPrefix + " ";
                            symbolSuffix = "";
                        }

                        if (typeof $scope.model.config.symbolSuffix !== 'undefined') {
                            symbolSuffix = " " + $scope.model.config.symbolSuffix;
                            symbolPrefix = "";
                        }

                        if ((typeof $scope.model.config.symbolSuffix === 'undefined') && (typeof $scope.model.config.symbolPrefix === 'undefined')) {
                            symbolSuffix = "";
                            if ($scope.model.config.currency == 1) {
                                symbolPrefix = data.data.currencySymbol + " ";
                            }
                        }

                        if (typeof $scope.model.config.mask !== 'undefined') {

                            $("#" + $scope.model.alias).inputmask($scope.model.config.mask, { "clearIncomplete": clearincomplete });

                            if ($scope.model.config.mobile == 1) {
                                vm.icon = "glyphicon glyphicon-phone";
                            }
                            else if ($scope.model.config.phone == 1) {
                                vm.icon = "glyphicon glyphicon-phone-alt";
                            }
                        }                        

                        if ($scope.model.config.date == 1) {

                            var dateSeparator = typeof $scope.model.config.dateSeparator !== 'undefined' ? $scope.model.config.dateSeparator : data.data.dateSeparator;
                            $("#" + $scope.model.alias).inputmask("99" + dateSeparator + "99" + dateSeparator + "9999",
                                {
                                    placeholder: $scope.model.config.dateFormat,
                                    inputFormat: $scope.model.config.dateFormat,
                                    clearIncomplete: clearincomplete
                                });

                            vm.icon = "glyphicon glyphicon-calendar";
                        }


                        if ($scope.model.config.email == 1) {

                            $("#" + $scope.model.alias).inputmask("email", {
                                onUnMask: function (maskedValue, unmaskedValue) {
                                    return unmaskedValue;
                                },
                                clearIncomplete: clearincomplete
                            });

                            vm.icon = "glyphicon glyphicon-inbox";
                        }

                        var currencygroupseparator;
                        var currencydecimalseparator;

                        if ($scope.model.config.currency == 1) {

                            currencygroupseparator = typeof $scope.model.config.currencygroupseparator !== 'undefined' ? $scope.model.config.currencygroupseparator : data.data.currencyGroupSeparator;
                            currencydecimalseparator = typeof $scope.model.config.currencydecimalseparator !== 'undefined' ? $scope.model.config.currencydecimalseparator : data.data.currencyDecimalSeparator;

                            $("#" + $scope.model.alias).maskMoney({
                                thousands: currencygroupseparator,
                                decimal: currencydecimalseparator,
                                allowZero: $scope.model.config.allowZero == 1 ? true : false,
                                prefix: symbolPrefix,
                                suffix: symbolSuffix,
                                precision: Number($scope.model.config.decimalPlaces)
                            }, { "clearIncomplete": clearincomplete });

                            if ($scope.model.config.symbolPrefix === '€' || $scope.model.config.symbolSuffix === '€') {
                                vm.icon = "glyphicon glyphicon-euro";
                            }
                            else {
                                vm.icon = "glyphicon glyphicon-usd";
                            }
                        }

                        if ($scope.model.config.number == 1) {
                            currencygroupseparator = typeof $scope.model.config.currencygroupseparator !== 'undefined' ? $scope.model.config.currencygroupseparator : data.data.currencyGroupSeparator;
                            currencydecimalseparator = typeof $scope.model.config.currencydecimalseparator !== 'undefined' ? $scope.model.config.currencydecimalseparator : data.data.currencyDecimalSeparator;
                            $("#" + $scope.model.alias).maskMoney({
                                thousands: currencygroupseparator,
                                decimal: currencydecimalseparator,
                                allowZero: $scope.model.config.allowZero == 1 ? true : false, 
                                prefix: symbolPrefix,
                                suffix: symbolSuffix,
                                precision: Number($scope.model.config.decimalPlaces)
                            }, { "clearIncomplete": clearincomplete });
                            vm.icon = "glyphicon glyphicon-plus";
                        }

                        $("#" + vm.alias).val($scope.model.value);

                    });
            });
    }

    angular.module('umbraco').controller('inputMask', inputMaskController);

})();








