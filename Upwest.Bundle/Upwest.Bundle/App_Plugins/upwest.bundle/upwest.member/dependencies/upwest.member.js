if (typeof jQuery == 'undefined') {
    alert("Please insert jquery on the top of your page");
}

const inputElements = [...document.querySelectorAll('input.code-input')]

inputElements.forEach((ele, index) => {
    ele.addEventListener('keydown', (e) => {       
        if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
    })
    ele.addEventListener('input', (e) => {        
        const [first, ...rest] = e.target.value
        e.target.value = first ?? ''
        const lastInputBox = index === inputElements.length - 1
        const didInsertContent = first !== undefined
        if (didInsertContent && !lastInputBox) {
            inputElements[index + 1].focus()
            inputElements[index + 1].value = rest.join('')
            inputElements[index + 1].dispatchEvent(new Event('input'))
        }
    })
})

$('#frmRegister').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#btnMemberRegister').click();
    }
});
$('#frmLogin').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#btnMemberLogin').click();
    }
});


$('#frmRecoverPass').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#btnRecoverPass').click();
    }
});

$('#frmExternalLogin').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#memberExternalRegister').click();
    }
});

$('#frmPersonalData').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('.btnMemberUpdate').click();
    }
});


$('#frmChangePass').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#btnChangePass').click();
    }
});

$('#frmSelectProvider').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $(".sw-btn-next").click();
    }
});

$('#frmvalidatePhoneNumberOrEmail').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $(".sw-btn-next").click();
    }
});

$('#btnMemberReset').click(function () {
    $(':input', '#frmRegister')
        .not(':button,:submit,:reset')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
});

$('#btnRecoverPassReset').click(function () {
    $(':input', '#frmRecoverPass')
        .not(':button,:submit,:reset')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
});



$('#frmUpdatePass').keydown(function (e) {
    var key = e.which;
    if (key == 13) {
        $("#btnUpdatePass").click();
    }
});

$('#lastCodeInput').keyup(function (e) {
    if ($(this).val()) {
        $(".sw-btn-next").click();
    }
});


$('#thermsAndConditions').change(function () {
    if (this.checked) {
        $("#btnMemberRegister").focus();   
    }
});



function maskPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{1})(.*)(\d{3})/, '$1******$3');
}

function maskEmail(email) {
    return email.replace(/(\w{1})(.*)(\w{1})@(.*)/, '$1******$3@$4');
}

function onCancel() {
    $('#twofactorAuthenticationWizard').smartWizard("reset");
}

function provideContent(step, stepDirection, stepPosition, selStep, callback) {

    let action = selStep.data('action');
    let formId = selStep.data('form');    
    let token = selStep.data('token');

    if (stepDirection == 'backward') {        
        $("[name='codeInput']").val('');
    }

    if (stepDirection == 'forward' && (stepPosition == 'middle' || stepPosition == 'last') ) {        

        if ($("#verifyCode").length > 0) {
            $("#verifyCode").val(inputElements.map(({ value }) => value).join(''));
        }

        if (stepDirection == 'forward') {
            if (!$('#' + formId).valid()) {                
                return false;
            }
        }
        postTwoFactorAuthentication(step,action, formId, token);       
    }
    callback();
}



function postTwoFactorAuthentication(step,action, formId, token) {

    $("#hddValidatePhoneNumberOrEmailPhoneNumberHidden").val($("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").val());

    $.ajax({
        url: "/umbraco/api/Member/" + action,
        data: JSON.stringify($('#' + formId).serializeObject()),
        type: 'POST',
        cache: false,
        dataType: "json",
        async: true,
        headers: { "RequestVerificationToken": token },
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $(".box").show();
        }
    }).done(function (data) {

        if (data.action == "selectProvider") {

            switch (data.provider) {
                case "Email":
                    $("#validatePhoneNumberOrEmailEmail").attr('readonly', true);
                    $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").removeClass("required");
                    $("#dvemail").show();
                    $("#dvphone").hide();
                    break;
                case "Phone":
                    $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").addClass("required");
                    if (!data.phoneNumberConfirmed) {
                        $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").attr('readonly', false);
                    }
                    else {                        
                        if (data.phoneNumber) {
                            $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").attr('readonly', true);
                            $("#hddValidatePhoneNumberOrEmailPhoneNumberHidden").val(data.phoneNumber);
                            $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").val(maskPhoneNumber(data.phoneNumber));
                        }
                        else {
                            $("#validatePhoneNumberOrEmailPhoneNumberWithIndicative").attr('readonly', false);
                        }
                    }
                    $("#dvemail").hide();
                    $("#dvphone").show();
                    break;
            }

            $("#hddValidatePhoneNumberOrEmailEmail").val(data.email);
            $("#validatePhoneNumberOrEmailEmail").val(maskEmail(data.email));
            $("#hddValidatePhoneNumberOrEmailProvider").val(data.provider);
        }

        if (data.action == "ValidatePhoneNumberOrEmail") {
            toastr.info(data.message);
            $("#VerifyCodeEmail").val(data.email);
            $("#VerifyCodePhoneNumber").val(data.phoneNumber);
        }

        if (data.action == "VerifyCode") {
            $(".success-checkmark").show();
            $(".check-icon").show();
            toastr.success(data.message);
            setTimeout(function () {
                window.location.href = data.url;
            }, 2000);
        }

        $("#validatePhoneNumberOrEmailProvider").val(data.provider);
        $("#verifyCodeProvider").val(data.provider);
        $(".box").fadeOut();
        return true;

    }).fail(function (data) {
        toastr.error(data.responseJSON.message);
        $(".box").hide();
        $('#twofactorAuthenticationWizard').smartWizard("goToStep", step - 1);
        return false;
    });
}

$(document).ready(function () {

    if ($("#twofactorAuthenticationWizard").length > 0) {
        setTimeout(function () {
            var input = document.querySelector("#validatePhoneNumberOrEmailPhoneNumberWithIndicative");
            var iti = window.intlTelInput(input, {
                geoIpLookup: function(callback) {
                   $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                     var countryCode = (resp && resp.country) ? resp.country : "";
                     callback(countryCode);
                   });
                },
                initialCountry: "auto",
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
                hiddenInput: "full_number"
            });
            window.iti = iti;

            input.addEventListener("countrychange", function (e) {                                
                $("#hddValidatePhoneNumberOrEmailIndicative").val(iti.getSelectedCountryData().dialCode);
            });
        }, 500);
    }


    if ($("#twofactorAuthenticationWizard").length > 0) {

        $("#twofactorAuthenticationWizard").on("showStep", function (e, anchorObject, stepIndex, stepDirection, stepPosition) {
            $("#prev-btn").removeClass('disabled').prop('disabled', false);
            $("#next-btn").removeClass('disabled').prop('disabled', false);
            if (stepPosition === 'first') {
                $("#prev-btn").addClass('disabled').prop('disabled', true);
            } else if (stepPosition === 'last') {
                $("#next-btn").addClass('disabled').prop('disabled', true);
            } else {
                $("#prev-btn").removeClass('disabled').prop('disabled', false);
                $("#next-btn").removeClass('disabled').prop('disabled', false);
            }            
            let stepInfo = $('#twofactorAuthenticationWizard').smartWizard("getStepInfo");
            $("#sw-current-step").text(stepInfo.currentStep + 1);
            $("#sw-total-step").text(stepInfo.totalSteps);
        });

        $('#twofactorAuthenticationWizard').hide();
        $(".box").show();
        $(".box").height(500);

        setTimeout(function () {            
            $(".box").fadeOut();
            $(".box").height("100%");
            $('#twofactorAuthenticationWizard').show();
            $('#twofactorAuthenticationWizard').smartWizard({
                selected: 0,
                theme: 'square', // basic, arrows, square, round, dots
                transition: {
                    animation: 'none' // none|fade|slideHorizontal|slideVertical|slideSwing|css
                },
                toolbar: {
                    showNextButton: true, // show/hide a Next button
                    showPreviousButton: true, // show/hide a Previous button
                    position: 'bottom', // none/ top/ both / bottom
                },
                anchor: {
                    enableNavigation: true, // Enable/Disable anchor navigation 
                    enableNavigationAlways: false, // Activates all anchors clickable always
                    enableDoneState: true, // Add done state on visited steps
                    markPreviousStepsAsDone: true, // When a step selected by url hash, all previous steps are marked done
                    unDoneOnBackNavigation: false, // While navigate back, done state will be cleared
                    enableDoneStateNavigation: true // Enable/Disable the done state navigation
                },
                lang: { 
                    next: nextText,
                    previous: previousText
                },
                disabledSteps: [], // Array Steps disabled
                errorSteps: [], // Highlight step with errors
                hiddenSteps: [], // Hidden steps
                getContent: provideContent
            });

            $("#state_selector").on("change", function () {
                $('#twofactorAuthenticationWizard').smartWizard("setState", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
                return true;
            });

            $("#style_selector").on("change", function () {
                $('#twofactorAuthenticationWizard').smartWizard("setStyle", [$('#step_to_style').val()], $(this).val(), !$('#is_reset').prop("checked"));
                return true;
            });
        }, 500);
    }


    $('#register').smartTab({
        theme: "basic",
        autoAdjustHeight: false,
        selected: 0,
        keyboard: {
            keyNavigation: false
        }
    });

    $('#loggedin').smartTab({
        autoAdjustHeight: false,
        selected: 0,
        keyboard: {
            keyNavigation: false
        }
    });

    if ($('#memberData').length > 0) {
        $('#memberData').hide();
        $('#menuMemberNav').hide();
        $(".box").show();
        $(".box").height(500);

        setTimeout(function () {
            $(".box").height("100%");
            $('#memberData').show();
            $(".box").fadeOut();
            $('#menuMemberNav').show();

            $('#memberData').smartTab({
                transition: {
                    animation: 'fade',
                    speed: '400',
                    easing: ''
                },
                theme: 'basic',
                selected: 0,
                autoAdjustHeight: false,
                keyboard: {
                    keyNavigation: false
                }
            });           
        }, 500);
    }


    $('#providerEmail').click(function () {
        if ($(this).is(":checked")) {
            $('#providerCellPhone').prop("checked", false);
        } 
        else {
            $('#providerCellPhone').prop("checked", true);
        }
    });

    $('#providerCellPhone').click(function () {
        if ($(this).is(":checked")) {
            $('#providerEmail').prop("checked", false);
        }
        else {
            $('#providerEmail').prop("checked", true);
        }
    });
    

    $('[data-toggle="password"]').each(function () {
        var eye = $(this).parent().find('.input-group-text');
        eye.css('cursor', 'pointer').addClass('input-password-hide');
    });

    toastr.options.escapeHtml = false;

        $('#btnMemberRegister').click(function () {
            postToMemberController(this, "Registration", false);
        });

        $('#btnMemberLogin').click(function () {
            postToMemberController(this, "Login", false);
        });

        $('#btnRecoverPass').click(function () {
            postToMemberController(this, "RecoverPassword", false);
        });

        $('.btnMemberUpdate').click(function () {
            postToMemberController(this, "UpdateMember", true);
        });

        $('#btnChangePass').click(function () {
            postToMemberController(this, "ChangePassword", false,);
        });

        $('#btnUpdatePass').click(function () {
            postToMemberController(this, "UpdatePassword", true);
        });
        
        $('#btnSendVerificationCode').click(function () {
            postToMemberController(this, "AddPhoneNumber", false, true);
        });

        $('#btnVerifyPhoneNumber').click(function () {
            postToMemberController(this, "VerifyPhoneNumber", false, true);
        });

        $('#btnSendCode').click(function () {
            postTwoFactorAuthentication(2, "ValidatePhoneNumberOrEmail", "frmVerifyCode", $(this).data("token"))
        });

        $('#memberExternalRegister').click(function () {
            validateExternalProviderAccount();
        });

    function postToMemberController(e, action, updateMode, messageWait,func) {

        var formId = $(e).parents('form').attr("id");        
        if (!$("#" + formId).valid()) {            
            return false;
        }

        $.ajax({
            url: "/umbraco/api/Member/" + action,
            data: JSON.stringify($('#' + formId).serializeObject()),
            type: 'POST',
            cache: false,
            dataType: "json",
            async: true,
            headers: { "RequestVerificationToken": $(e).data("token") },
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $(".box").show();
            },
            success: function (data) {

                if (data.message) {
                    toastr.success(data.message);
                }

                if (data.url) {
                    if (messageWait) {
                        setTimeout(function () {
                            window.location.href = data.url;
                        }, 2000);
                    }
                    else {
                        window.location.href = data.url;
                    }
                }
                else {
                    if (!updateMode) {
                        $("#" + formId)[0].reset();
                        if ($(".lblRecapthca").length > 0) {
                            clearRecaptcha();
                        }
                        $(".box").fadeOut();
                    }
                    else {
                        $(".box").fadeOut();
                    }
                }

                if (data.runFunc) {
                    $('#register').smartTab('goToTab', 0);
                }

                if (func) {                    
                    func();
                }
            },
            error: function (data) {

                var done = false;
                try {
                    if (data.responseJSON.message) {
                        toastr.error(data.responseJSON.message);
                        done = true;
                    }
                } catch (e) {}


                if (!done) {
                    try {
                        if (data.responseText) {
                            toastr.error(data.responseText);
                        }
                    } catch (e) {}
                }

                $(".box").fadeOut();
            }
        });
    }

    $('#btnLogoutMember').click(function (e) {
        $.ajax({
            url: "/umbraco/api/Member/Logout",                
            type: 'POST',
            cache: false,
            dataType: "json",
            async: true,
            headers: { "RequestVerificationToken": $(this).data("token") },
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $(".box").show();
            },
            success: function (data) {
                window.location.href = "/";
            },
            error: function (data) {
                toastr.error(data.responseText);
                $(".box").fadeOut();
            },
            complete: function (data) {

            }
        });
    });
});


function showPassword(element, passId) {

    var eye = $(element).parent().find('.input-group-text');

    if (eye.hasClass('input-password-hide')) {
        eye.removeClass('input-password-hide').addClass('input-password-show');
        eye.find('.glyphicon').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        $("#" + passId).attr('type', 'text');
    }
    else {
        eye.removeClass('input-password-show').addClass('input-password-hide');
        eye.find('.glyphicon').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        $("#" + passId).attr('type', 'password');
    }
}
    

function validateExternalProviderAccount() {

    var formId = $("#memberExternalRegister").parents('form').attr("id");

    if (!$("#" + formId).valid()) {
        return false;
    }

    $.ajax({
        url: "/umbraco/api/" + $("#memberExternalRegister").data("providercontroller") + "/ValidateAccount",
        data: JSON.stringify($('#' + formId).serializeObject()),
        headers: { "RequestVerificationToken": $("#memberExternalRegister").data("token") },
        type: 'POST',
        cache: false,
        dataType: "json",
        async: true,
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $(".box").show();
        },
        success: function (data) {
            if (data.message) {
                $(".box").show();
                toastr.success(data.message);
                setTimeout(function () {
                    window.location.href = data.url;
                }, 2000);
            }
            else {
                window.location.href = data.url;
            }
        },
        error: function (data) {            
            toastr.error(data.responseJSON.message);
            $(".box").fadeOut();
        }
    });
}




