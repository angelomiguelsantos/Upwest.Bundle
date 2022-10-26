(function () {
    'use strict';

	function cropAndUploadController($scope, $routeParams, notificationsService) {

		var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
		vm.message = $scope.model.validation.mandatoryMessage;
		var url;

		if ($routeParams.section === 'settings') {
			return;
		}
		
		setTimeout(function () {

			if ($scope.model.value) {
				$('#cropContainer' + vm.alias).prepend('<img class="upwestCropAndUploadImage"  src="' + $scope.model.value + '"/>');
				$('#clear' + vm.alias).show();
			}
			else {
				$('#clear' + vm.alias).hide();
            }

			$('#' + vm.alias).ijaboCropTool({
				preview: '.image-previewer',
				setRatio: $scope.model.config.setRatio,
				allowedExtensions: ['jpg','jpeg','png','gif'],
				buttonsText: ['<i class="fa fa-check"></i>', 'X'],
				buttonsColor: ['#39d38b', '#f3ece8', -15],
				processUrl: '/umbraco/backoffice/api/CropAndUploadBackoffice/UploadImage',
				onSuccess: function (message) {
					$('#cropContainer' + vm.alias).html("");
					url = message;
					$('#cropContainer' + vm.alias).prepend('<img class="upwestCropAndUploadImage"  src="' + message + '"/>');
					$('#clear' + vm.alias).show();
				},
				onError: function (message) {
					notificationsService.error("Error", message);
				}
			});
		}, 500);

		$scope.$on("formSubmitting", function (ev, args) {			
			$scope.model.value = url;
		});

		vm.clearImage = clearImage;

        function clearImage() {
			$('#cropContainer' + vm.alias).html("");
			$('#clear' + vm.alias).hide();
			url = '';
		}		
	}

	angular.module('umbraco').controller('upwestCropAndUpload', cropAndUploadController);

})();














