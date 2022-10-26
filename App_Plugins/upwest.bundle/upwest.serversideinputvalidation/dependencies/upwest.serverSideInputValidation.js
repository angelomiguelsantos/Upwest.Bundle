(function ($) {
    $.fn.extend({
        serverSideInputValidation: function (options) {
            var defaults = {
                alias: "serverSideInputValidation",                
                exists: true,
                byTable: false,
                byMember: false,
                byUser: false,
                byContent: false,
                table: "",
                field: "",
                contentTypeId: 0,
                culture: "",
                languageId : 0,
                label: "",
                token: "",
                icon: "",                
                value: "",
                fieldType : ""
            };

            options = $.extend(defaults, options);

            return {
                validateOnServer: function (value) {
                    defaults.value = value;
                    validateOnServer();
                },
                change: function () {
                    $("#icon" + defaults.alias).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove').addClass(defaults.icon);
                    $("#icon" + defaults.alias).css("color", "unset");
                }
            }

            function validateOnServer() {

                if (defaults.value !== '') {
                    $.ajax({
                        url: "/umbraco/api/ServerSideInputValidation/Validate",
                        data: JSON.stringify(defaults),
                        type: 'POST',
                        cache: false,
                        dataType: "json",
                        headers: { "RequestVerificationToken": defaults.token },
                        async: true,
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data.result) {
                                //if (defaults.fieldType === "email") {
                                //    $("#btnValidateEmail" + defaults.alias).show();
                                //}
                                $("#icon" + defaults.alias).removeClass(defaults.icon).removeClass('glyphicon glyphicon-remove').addClass('glyphicon glyphicon-ok');
                                $("#icon" + defaults.alias).css("color", "green");
                                $("#email-error").remove('');

                            }
                            else {
                                //if (defaults.fieldType === "email") {
                                //    $("#btnValidateEmail" + defaults.alias).hide();
                                //}
                                $("#icon" + defaults.alias).removeClass(defaults.icon).removeClass('glyphicon glyphicon-ok').addClass('glyphicon glyphicon-remove');
                                $("#icon" + defaults.alias).css("color", "red");
                                $("#" + defaults.alias).val("");
                                toastr.error(data.message);
                            }
                        },
                        error: function (data) {
                            toastr.error(data.responseJSON.message);
                        }
                    });
                }
            }
        }
    });
})(jQuery);