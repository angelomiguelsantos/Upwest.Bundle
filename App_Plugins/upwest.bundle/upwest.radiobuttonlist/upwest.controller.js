(function () {
    'use strict';
    function radioButtonListController($http, $scope,$routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        $scope.radioButtons = [];        
        vm.columns = 12 / $scope.model.config.numberOfColumns;

        if ($routeParams.section === 'settings') {
            $scope.radioButtons = [{ id: 0, text: "Option 1" }, { id: 1, text: "Option 2" }];
            return;
        }

        $scope.getRadioButtons = function () {
            $http({
                url: "/umbraco/backoffice/api/radioButtonListBackoffice/GetRadioButtons",
                method: "GET",
                params: {                    
                    dataTypeId: $scope.model.config.dataType,                    
                    table: $scope.model.config.table,
                    column: $scope.model.config.column,      
                    contentTypeId: $scope.model.config.contentTypeId,
                    contentAlias: $scope.model.config.contentAlias,
                    memberField: $scope.model.config.memberField,
                    userField: $scope.model.config.userField,
                    filter: $scope.model.config.filter,
                    alias: vm.alias,
                    dataOptions: $scope.model.config.dataOptions,
                    translateFrom: $scope.model.config.translateFrom
                },
                cache: false
            }).then(function success(data) {
                $scope.radioButtons = data.data;

                $("#noneOption" + vm.alias).hide();
                if ($scope.model.config.noneOption == 1) {
                    $("#noneOption" + vm.alias).show();
                }

                setTimeout(function () {
                    $("#opt" + vm.alias + $scope.model.value).iCheck('check');
                }, 100);
            });
        };

        $scope.getRadioButtons();

        vm.setRadioButton = function setCheckBox(e) {            
            if (e.target.checked) {                
                $scope.model.value = e.target.value;
            }
        }
    }

    angular.module('umbraco').controller('upwest.radioButtonList', radioButtonListController);

})();











