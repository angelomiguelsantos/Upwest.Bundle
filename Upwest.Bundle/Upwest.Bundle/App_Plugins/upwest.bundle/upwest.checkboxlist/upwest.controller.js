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

                $scope.checkboxes = data.data;
                setTimeout(function () {

                    //$('[name=' + vm.alias + ']').iCheck({
                    //    checkedClass: 'upwestChecked'
                    //});


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











