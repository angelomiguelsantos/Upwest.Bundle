
(function () {
    'use strict';

    function tagsController($scope, $routeParams) {


        if ($routeParams.section === 'settings') {
            return;
        }

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        $scope.loading = false;

        setTimeout(function () {
            var s = $('#' + vm.alias).selectize({
                theme: $scope.model.config.theme,
                persist: false,
                createOnBlur: true,
                create: true,                
                maxItems: $scope.model.config.maxItems
            });

            s.on('change', function () {
                $scope.model.value = this.value;
            });
        }, 100);
    }

    angular.module('umbraco').controller('tags', tagsController);

})();








