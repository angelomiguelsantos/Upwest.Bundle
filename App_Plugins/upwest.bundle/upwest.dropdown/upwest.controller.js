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











