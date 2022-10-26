
(function () {
    'use strict';

    function upwestSliderController($scope) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        $scope.loading = false;  

        var enableRange = $scope.model.config.enableRange == 1 ? "double" : "single";
        var from = 0;
        var to = 1000;

        if ($scope.model.config.enableRange ==1) {
            if ($scope.model.value) {
                from = $scope.model.value.split('-')[0];
                to = $scope.model.value.split('-')[1];
            }
            else {
                from = $scope.model.config.from;
                to = $scope.model.config.to;
            }
        }

        setTimeout(function () {
            $("#" + vm.alias).ionRangeSlider({          
                type: enableRange,
                skin: $scope.model.config.skin,
                grid: true,
                min: $scope.model.config.min,
                max: $scope.model.config.max,
                drag_interval: $scope.model.config.dragInterval == 1 ? true : false,
                from: from,
                to: to,
                prettify_enabled: true,
                prefix: $scope.model.config.prefix,
                postfix: $scope.model.config.postfix,
                onChange: function (data) {
                    if ($scope.model.config.enableRange == 1) {
                        $scope.model.value = data.from + "-" + data.to;
                    }
                    else {
                        $scope.model.value = data.from;
                    }
                },
                step: $scope.model.config.step,
                grid_snap: $scope.model.gridSnap,
                block: false
            });
        }, 100);

        
    }

    angular.module('umbraco').controller('upwestSlider', upwestSliderController);

})();








