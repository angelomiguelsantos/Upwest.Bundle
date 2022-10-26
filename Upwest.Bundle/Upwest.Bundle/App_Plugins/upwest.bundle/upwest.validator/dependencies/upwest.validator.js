jQuery.fn.shake = function (interval, distance, times) {
    interval = typeof interval == "undefined" ? 100 : interval;
    distance = typeof distance == "undefined" ? 10 : distance;
    times = typeof times == "undefined" ? 3 : times;
    var jTarget = $(this);
    jTarget.css('position', 'relative');
    for (var iter = 0; iter < (times + 1); iter++) {
        jTarget.animate({ left: ((iter % 2 == 0 ? distance : distance * -1)) }, interval);
    }
    return jTarget.animate({ left: 0 }, interval);
}

var regularExpression;
var regularExpressionMessage;
var weak;
var medium;
var strong;
var veryStrong;
var passwordRequiredLengthText;
var passwordRequiredLength;
var passwordRequireLowercase;
var passwordRequireUppercase;
var passwordRequireDigit;
var passwordRequireSpecialCharacter;
var requiredText;
var remoteText;
var emailText;
var urlText;
var dateText;
var minLenghtText;
var passDontMatch;
var passId;
var ofcharactersTrans;
var lowerCaseTrans;
var upperCaseTrans;
var capitalLetterTrans;
var numberTrans;
var specialCharacterTrans;

function renderPasswords() {

    $("#" + passId).passwordRequirements({
        numCharacters: passwordRequiredLength,
        useLowercase: passwordRequireLowercase,
        useUppercase: passwordRequireUppercase,
        useNumbers: passwordRequireDigit,
        useSpecial: passwordRequireSpecialCharacter,
        message: regularExpressionMessage,
        ofcharactersTrans: ofcharactersTrans,
        lowerCaseTrans: lowerCaseTrans,
        upperCaseTrans: upperCaseTrans,
        capitalLetterTrans: capitalLetterTrans,
        numberTrans: numberTrans,
        specialCharacterTrans: specialCharacterTrans

    });

    $("#" + passId).passtrength({
        passwordToggle: false,
        tooltip: true,
        minChars: passwordRequiredLength,
        textWeak: weak,
        textMedium: medium,
        textStrong: strong,
        textVeryStrong: veryStrong,
    });
}

function renderValidator() {

    $.validator.setDefaults({
        highlight: function (element) {
            $(element).addClass("invalid");
        },
        unhighlight: function (element) {
            $(element).removeClass("invalid");
        }
    });

    $.validator.addMethod(
        "regex",
        function (value, element, regexp) {
            return this.optional(element) || regexp.test(value);
        },
        requiredText
    );

    $.validator.setDefaults({
        ignore: []
    });

    jQuery.extend(jQuery.validator.messages, {
        required: requiredText,
        remote: remoteText,
        email: emailText,
        url: urlText,
        date: dateText,
        minlength: jQuery.validator.format(minLenghtText)
    }); 

    $('form').each(function (i, obj) {
        formValidations($(obj).attr("id"));
    });
}


function formValidations(formId) {
    var form = $("#" + formId);
    var errorElements = [];
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            var lbl = $("#" + element.data('label'));
            lbl.append(error);
        },
        success: function (label) {
            $(label).each(function (index) {
                var element = $("#" + $(this).attr("for"));
                if (jQuery.inArray(element.attr("name"), errorElements) !== -1) {
                    var tab = element.data("tab");
                    if (tab) {
                        $('a[href="' + tab + '"]').attr("style", "color: black !important");
                        errorElements = jQuery.grep(errorElements, function (value) {
                            return value != element.attr("name");
                        });
                    }
                }
            });
        },
        showErrors: function (errorMap, errorList) {
            $(errorList).each(function (index) {
                var tab = $(this.element).data("tab");
                if (tab) {
                    $('a[href="' + tab + '"]').attr("style", "color: red !important");
                    errorElements.push($(this.element).attr("name"));
                    $('a[href="' + tab + '"]').shake();
                }
            });
            this.defaultShowErrors();
        },
        rules: {
            password: {
                minlength: passwordRequiredLength,                           
                required: true,
                regex: regularExpression
            },
            repeatPassword: {
                required: true,
                minlength: passwordRequiredLength,
                equalTo: "#" + passId,
                regex: regularExpression
            }
        },
        messages: {
            password: {
                minlength: minLenghtText,
                regex: regularExpressionMessage
            },
            repeatPassword: {
                equalTo: passDontMatch
            }
        }
    });
}