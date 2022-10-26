(function () {
    'use strict';

    function autoCompleteController($scope, $routeParams) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;        

        if ($routeParams.section === 'settings') {
            return;
        }

        setTimeout(() => {

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/umbraco/backoffice/api/Autocomplete/GetData",
                        data: {
                            text: function () {
                                return $("#" + $scope.model.alias).data("kendoAutoComplete").value();
                            },
                            table: $scope.model.config.table,
                            column: $scope.model.config.column,
                            filterType: $scope.model.config.filterType,
                            byContent: $scope.model.config.byContent == 1 ? true : false,
                            byMember: $scope.model.config.byMember == 1 ? true : false,
                            byUser: $scope.model.config.byUser == 1 ? true : false,
                            byTable: $scope.model.config.byTable == 1 ? true : false,
                            contentTypeId: $scope.model.config.contentTypeId,
                            contentAlias: $scope.model.config.contentAlias,
                            memberField: $scope.model.config.memberField,
                            userField: $scope.model.config.userField,
                            separator: ","
                        }
                    }
                },
                serverFiltering: true
            });

            $("#" + vm.alias).kendoAutoComplete({
                minLength: $scope.model.config.minLength,
                dataTextField: "text",
                filter: $scope.model.config.filter,
                dataSource: dataSource,
                placeholder: "...",
                separator: ","
            });

            $("#controller" + vm.alias + " > div > span ").width(800 + 39);            
            $(".input-group > span").css("width", "100%;");
            $(".input-group > span").css("max-width", "800px;");
        }, 100);
    }

    angular.module('umbraco').controller('AutoComplete', autoCompleteController);

})();








