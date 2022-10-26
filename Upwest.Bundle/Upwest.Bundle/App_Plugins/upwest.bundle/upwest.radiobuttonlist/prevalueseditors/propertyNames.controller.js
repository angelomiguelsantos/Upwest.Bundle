(function () {
    'use strict';
    function propertyNamesController($http, $scope) {

        var vm = this;
        vm.alias = $scope.model.alias;        
        $("#" + vm.alias).val($scope.model.value);
        $scope.propertyNames = [];
        $scope.retreivePropertyNames = function () {
            $http.get("/umbraco/backoffice/api/CheckboxList/GetPropertyNames").then(function (data) {
                $scope.propertyNames = data.data;
            });
        };

        $scope.retreivePropertyNames();

        $scope.$on("formSubmitting", function () {            
            $scope.model.value = $("#" + vm.alias).val();
        });

    }
    angular.module('umbraco').controller('upwest.PropertyNames', propertyNamesController);
})();





















