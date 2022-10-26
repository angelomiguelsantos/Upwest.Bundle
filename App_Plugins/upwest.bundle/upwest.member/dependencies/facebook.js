function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/" + facebookLanguage + "/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function () {
    FB.init({
        appId: facebookKey,
        cookie: true,
        xfbml: true,
        version: 'v' + facebookVersion
    });
}


function logWithfacebook(languageId) {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response, languageId);
    });
}


function statusChangeCallback(response,languageId) {
    switch (response.status) {
        case "connected":
            loginFacebook(languageId);
            break;
        case "unknown":
            toastr.error("Unknown");    
            break;
        case "not_authorized":
            toastr.error("Not authorized");    
            break;
    }
}


function loginFacebook(languageId) {

    FB.api('/me?fields=name,email', function (response) {
        $.ajax({
            url: "/umbraco/api/FacebookLoginButton/Login",
            data: JSON.stringify({ email: response.email, name: response.name, languageId: languageId }),
            headers: { "RequestVerificationToken": faceboookButtonToken },
            type: 'POST',
            cache: false,
            dataType: "json",
            async: true,
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $(".box").show();
            },
            success: function (data) {
                if (data.action === "newexternallogin") {
                    window.location.href = data.url + "?facebook=true";
                }
                else {
                    window.location.href = data.url;
                }
            },
            error: function (data) {
                toastr.error(data.responseJSON.message);
                $(".box").fadeOut();
            },
            complete: function (data) {

            }
        });
    });
}




