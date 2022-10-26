(function () {
    "use strict";

    function datePicker($scope) {

        var vm = this;
        vm.date = $scope.model.value;
        var value;

        vm.config = {
            enableTime: false,
            dateFormat: dateRangePickerFormat,
            time_24hr: false
        };

        vm.datePickerChange = datePickerChange;

        function datePickerChange(selectedDates, dateStr, instance) {
            value = dateStr;
            $scope.model.value = dateStr;
        }

        $scope.$on("formSubmitting", function () {
            $scope.model.value = value;
        });
    }
    angular.module("umbraco").controller("Upwest.Date", datePicker);
})();