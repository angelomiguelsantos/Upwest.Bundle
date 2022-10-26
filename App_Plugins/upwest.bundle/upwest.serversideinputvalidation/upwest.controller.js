
(function () {
    'use strict';

    function serverSideInputValidationController($http,$scope,$routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        
        vm.icon = $scope.model.config.icon;

        if ($routeParams.section === 'settings') {
            return;
        }

        vm.blur = validate;
        vm.change = change;        

        function change() { 
            $("#icon" + vm.alias).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove').addClass(vm.icon);
            $("#icon" + vm.alias).css("color", "unset");
        }

        function validate(e) {
            validateOnServer(e.target.value);
        }

        function validateOnServer(value) {

            if (value !== '') {
                $.ajax({
                    url: "/umbraco/backoffice/api/ServerSideInputBackofficeValidation/Validate",
                    data: JSON.stringify({
                        value: value,
                        exists: $scope.model.config.exists == 1 ? true : false,
                        byTable: $scope.model.config.byTable == 1 ? true : false, 
                        byMember: $scope.model.config.byMember == 1 ? true : false,
                        byUser: $scope.model.config.byUser == 1 ? true : false,
                        byContent: $scope.model.config.byContent == 1 ? true : false,
                        table:$scope.model.config.table,
                        field:$scope.model.config.field,                        
                        contentTypeId: $scope.model.config.contentTypeId,
                        culture: "en-US",
                        filter: $scope.model.config.filter
                    }),
                    type: 'POST',
                    cache: false,
                    dataType: "json",
                    async: true,
                    contentType: 'application/json; charset=utf-8',                    
                    success: function (data) {
                        if (data.result) {
                            $("#icon" + vm.alias).removeClass(vm.icon).removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok');
                            $("#icon" + vm.alias).css("color", "green");
                        }
                        else {
                            $("#icon" + vm.alias).removeClass(vm.icon).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove');
                            $("#icon" + vm.alias).css("color", "red");
                            $("#" + vm.alias).val("");
                        }
                    },
                    error: function (data) {
                        $("#icon" + vm.alias).removeClass(vm.icon).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove');
                        $("#icon" + vm.alias).css("color", "red");
                        $("#" + vm.alias).val(data.responseJSON.message);
                    }
                });
            }
        }
    }

    angular.module('umbraco').controller('serverSideInputValidation', serverSideInputValidationController);

})();








