(function () {
    'use strict';
    function dropdownController($http, $scope) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        $scope.dropdownItems = [];        

        $scope.getdropdownItems = function () {
            $http({
                url: "/umbraco/backoffice/api/DropdownList/GetDropdownOptions",
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
                $scope.dropdownItems = data.data;
            });
        };

        $scope.getdropdownItems();

        $scope.$on("formSubmitting", function () {
            $scope.model.value = $("#" + vm.alias).val();
        });

        
    }

    angular.module('umbraco').controller('upwest.dropdown', dropdownController);

})();











