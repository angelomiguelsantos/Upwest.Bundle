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
                    byDataType: $scope.model.config.byDatatype == 1 ? true : false,
                    dataTypeId: $scope.model.config.dataType,
                    byTable: $scope.model.config.byTable == 1 ? true : false,
                    table: $scope.model.config.table,
                    column: $scope.model.config.column,                    
                    byContent: $scope.model.config.byContent == 1 ? true : false,
                    contentTypeId: $scope.model.config.contentTypeId,
                    contentAlias: $scope.model.config.contentAlias,
                    byMember: $scope.model.config.byMember == 1 ? true : false,
                    memberField: $scope.model.config.memberField,
                    byUser: $scope.model.config.byUser == 1 ? true : false,
                    userField: $scope.model.config.userField,
                    filter: $scope.model.config.filter,
                    alias: vm.alias
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











