(function () {
    "use strict";

    function datePicker($scope) {

        var vm = this;
        vm.date = $scope.model.value;
        var value;
        vm.alias = $scope.alias;

        $("#" + vm.alias).val(vm.date);

        vm.config = {
            enableTime: false,
            dateFormat: dateRangePickerFormat,
            time_24hr: false
        };

        vm.datePickerChange = datePickerChange;

        function datePickerChange(selectedDates, dateStr, instance) {
            $scope.model.value = dateStr;
            value = dateStr;
        }

        $scope.$on("formSubmitting", function () {
            $scope.model.value = value;
        });
    }
    angular.module("umbraco").controller("Upwest.Date", datePicker);
})();