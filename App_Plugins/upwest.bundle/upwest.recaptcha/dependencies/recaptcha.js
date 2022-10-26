var loadRecaptcha;

function loadMemberArea(script, asyncro) {
    var loadedScripts = document.getElementsByTagName("script");
    var lastScript = loadedScripts[loadedScripts.length - 1];
    var newScript = document.createElement('script');
    newScript.setAttribute('src', script);
    if (asyncro) {
        newScript.defer = true;
        newScript.async = true;
    }
    lastScript.insertAdjacentElement('afterend', newScript);
}


function checkRecaptcha() {
    $('[id^="g-recaptcha-response"]').each(function () {
        if ($.trim($(this).val())) {
            $('input[name="recaptcha"]').val($(this).val());
        }
    });

    setTimeout(checkRecaptcha, 10);
}

function clearRecaptcha() {
    var i = 0;

    $('[id^="recaptchaResponse"]').each(function () {
        grecaptcha.reset(i);
        i++;
    });

    $('[id^="recaptchaTextAreaResponse"]').each(function () {
        $(this).val('');
    });
}

loadRecaptcha = function () {
    $('[id^="recaptchaResponse"]').each(function () {
        grecaptcha.render(this.id, { 'sitekey': recaptchaKey });
    });
};


