



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

$(document).ready(function () {
    $(".btn-facebook").click(function () {
        $(".box").show();
        FB.logout(function () {
            deleteFacebookCookie($(this).data("key"));
        });
        logout(this);
    });

    $(".btn-google").click(function () {
        google.accounts.id.disableAutoSelect();
        logout(this);
    });

    $(".btn-site").click(function () {        
        logout(this);
    });

    $(".btn-linkedin").click(function () {
        logout(this);
    });

    $(".btn-twitter").click(function () {
        logout(this);
    });

    $(".btn-instagram").click(function () {
        logout(this);
    });

});

function logout(e) {

    var url = $(e).data("url");

    $.ajax({
        url: "/umbraco/api/LogoutButton/Logout",
        headers: { "RequestVerificationToken": $(e).data("token") },        
        type: 'POST',
        data: JSON.stringify({ languageId: $(e).data("language") }),
        cache: false,
        dataType: "json",
        async: true,           
        beforeSend: function () {
            $(".box").show();
        },
        success: function () {
            document.location.href = url;
        },
        error: function (data) {

            var done = false;
            try {
                if (data.responseJSON.message) {
                    toastr.error(data.responseJSON.message);
                    done = true;
                }
            } catch (e) { }


            if (!done) {
                try {
                    if (data.responseText) {
                        toastr.error(data.responseText);
                    }
                } catch (e) { }
            }
            $(".box").fadeOut();
        }
    });
}

function deleteFacebookCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}