var isServiceDirty = false;
(function () {
    'use strict';

    function MemberController($http, $scope, $routeParams, notificationsService) {

        var vm = this;
        vm.alias = $scope.model.alias;
        vm.required = $scope.model.validation.mandatory;
        vm.message = $scope.model.validation.mandatoryMessage;
        var enableServiceforInactiveAccounts = $scope.model.config.enableServiceforInactiveAccounts == 1 ? true:false;

        if ($routeParams.section === 'settings') {
            $("#loginMessageDiv").show();
            $("#registerMessageDiv").show();
            $("#lblTask").show();
            $("#lblLogin").show();
            $("#lblRegister").show();            
            return;
        }

        $scope.loading = true;
        $("#loginMessageDiv").hide();
        $("#registerMessageDiv").hide();
        $("#lblTask").hide();

        $("#lblLogin").hide();
        $("#disableLogin").prop("checked", false);

        $("#lblRegister").hide();
        $("#disableRegistration").prop("checked", false);

        var value = $scope.model.value;
        var trans;

        var richTextConfig ={
          lang: 'en',
          fixedBtnPane: false,
          fixedFullWidth: false,
          autogrow: false,
          autogrowOnEnter: false,
          prefix: 'trumbowyg-',
          tagClasses: {},
          semantic: true,
          semanticKeepAttributes: false,
          resetCss: false,
          removeformatPasted: false,
          tabToIndent: false,
          tagsToRemove: [],
          tagsToKeep: ['hr', 'img', 'embed', 'iframe', 'input'],
          btns: [
            ['viewHTML'],
            ['undo', 'redo'], 
            ['formatting'],
            ['strong', 'em', 'del'],
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
          ],          
          btnsDef: {},
          changeActiveDropdownIcon: false,
          inlineElementsSelector: 'a,abbr,acronym,b,caption,cite,code,col,dfn,dir,dt,dd,em,font,hr,i,kbd,li,q,span,strikeout,strong,sub,sup,u',
          pasteHandlers: [],
          plugins: {},
          urlProtocol: false,
          minimalLinks: false,
          defaultLinkTarget: undefined
        };

        setTimeout(function () {        
            $.trumbowyg.svgPath = '/App_Plugins/upwest.bundle/upwest.member/dependencies/icons.svg';
            $('#registerClosedMessage').trumbowyg(richTextConfig);
            $('#loginClosedMessage').trumbowyg(richTextConfig);            
        }, 500);


        if (value) {

            if (value.disableLogin) {
                $("#lblLogin").show();
                $("#disableLogin").prop("checked", true);
            }

            if (value.disableRegistration) {
                $("#lblRegister").show();
                $("#disableRegistration").prop("checked", true);
            }

            if (value.startService) {                
                $("#startService").prop("checked", true);
            }

            vm.disableLogin = value.disableLogin ? "checked" : "";
            vm.disableRegistration = value.disableRegistration ? "checked" : "";
            vm.loginClosedMessage = value.loginClosedMessage;
            vm.registerClosedMessage = value.registerClosedMessage;
            vm.startService = value.startService ? "checked" : "";
            vm.serviceStarted = value.startService;
        }
        else {
            vm.serviceIsStarted = "";
        }

        $http({
            url: "/umbraco/backoffice/api/MemberAuthorized/GetTranslations",
            method: "GET",
            cache: true
        }).then(function success(data) {

            trans = data.data.translations;
            vm.Message = trans.MESSAGE;
            vm.DisableNewRegistrations = trans.DISABLENEWREGISTRATIONS;            
            vm.EnableServiceforinactiveaccounts = trans.ENABLESERVICEFORINACTIVEACCOUNTS;
            vm.DisableLogin = trans.DISABLELOGIN;            

            $("#memberContainer").show();
            
            if (enableServiceforInactiveAccounts) {

                if ((data.data.defaultLanguage == $routeParams.cculture) && data.data.isAdmin) {
                    $("#lblTask").show();
                }

                if ((data.data.defaultLanguage == $routeParams.mculture) && data.data.isAdmin) {
                    $("#lblTask").show();
                }               

                if (($routeParams.mculture === null && $routeParams.cculture === null) && data.data.isAdmin) {
                    $("#lblTask").show();
                }

                if ((typeof $routeParams.mculture === 'undefined' && typeof $routeParams.cculture === 'undefined') && data.data.isAdmin) {
                    $("#lblTask").show();
                }
            }

            if (data.data.isAdmin) {
                $("#loginMessageDiv").show();
                $("#registerMessageDiv").show();
            }
            $scope.loading = false;
        });

        $scope.$on("formSubmitting", function () {
            $scope.model.value = {
                "disableLogin": $("#disableLogin").is(":checked"),
                "disableRegistration": $("#disableRegistration").is(":checked"),
                "loginClosedMessage": $("#loginClosedMessage").val(),
                "registerClosedMessage": $("#registerClosedMessage").val(),
                "startService": $("#startService").is(":checked")
            };

            if (enableServiceforInactiveAccounts) {

                if (isServiceDirty) {
                    $http({
                        url: "/umbraco/backoffice/api/MemberAuthorized/StartService",
                        params: {
                            startService: $("#startService").is(":checked"),
                            checkForInactiveAccountsDays: $scope.model.config.checkForInactiveAccountsDays,
                            warningDays: $scope.model.config.warningDays,
                            emailTemplate: $scope.model.config.emailTemplate,
                            contentId: $routeParams.id
                        },
                        method: "GET",
                        cache: false
                    }).then(function success(data) {
                        if (data.data.startService) {
                            notificationsService.success("Success", "Member service started");
                        }
                        else {
                            notificationsService.success("Success", "Member service stopped");
                        }
                    }).catch(function (data) {
                        notificationsService.error("Error", "Member service did not start.Please consult logs");
                    });
                    isServiceDirty = false;
                }
            }
        });
    }

    angular.module('umbraco').controller('upwest.Member', MemberController);

})();


function onLoginChange() {
    if ($("#disableLogin").is(":checked")) {        
        $("#lblLogin").fadeIn();
    }
    else {        
        $("#lblLogin").fadeOut();
    }
}

function onServiceChange() {
    isServiceDirty = true;
}

function onRegisterChange() {
    if ($("#disableRegistration").is(":checked")) {        
        $("#lblRegister").fadeIn();
    }
    else {        
        $("#lblRegister").fadeOut();
    }
}







