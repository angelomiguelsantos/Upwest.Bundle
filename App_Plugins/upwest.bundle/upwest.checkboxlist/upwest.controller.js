(function () {
    'use strict';
    function checkboxListController($http, $scope, $routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        $scope.checkboxes = [];        
        vm.columns = 12 / $scope.model.config.numberOfColumns;

        if ($routeParams.section === 'settings') {
            $scope.checkboxes = [{ id:0, text:"Option 1" },{ id:1, text:"Option 2" }];
            return;
        }

        $scope.getCheckboxes = function () {
            $http({
                url: "/umbraco/backoffice/api/CheckboxList/GetCheckboxes",
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
                    translateFrom: $scope.model.config.translateFrom,
                },
                cache: false
            }).then(function success(data) {
                $scope.checkboxes = data.data;
                setTimeout(function () {
                    $.each($scope.model.value.split(','), function (key, value) {
                        $("#chk" + vm.alias + value).iCheck('check');
                    });
                }, 100);
            });
        };

        $scope.getCheckboxes();

        vm.setCheckBox = function setCheckBox(e) {
            var values = $scope.model.value;
            if (e.target.checked) {                
                if (values.indexOf(e.target.value) === -1) {
                    values = values + e.target.value + ",";
                }
                
                $scope.model.value = values;
            }
            else {                
                values = values.replace(e.target.value + ",", "");
                $("#hdd" + vm.alias).val(values);
                $scope.model.value = values;
            }
        }
    }

    angular.module('umbraco').controller('upwest.checkboxlist', checkboxListController);

})();











