function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {    
    const responsePayload = parseJwt(response.credential);
    $.ajax({
        url: "/umbraco/api/GoogleLoginButton/Login",
        data: JSON.stringify({ email: responsePayload.email, name: responsePayload.name, languageId: googleLanguageId, loginTimeout: googleLoginTimeout, redirectTo: googleRedirectTo, contentId: googleContentId }),        
        headers: { "RequestVerificationToken": googleButtonToken },
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
                window.location.href = data.url + "?google=true";
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
}