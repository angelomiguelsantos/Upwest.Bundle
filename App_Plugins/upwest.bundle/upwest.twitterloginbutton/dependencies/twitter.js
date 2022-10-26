$(document).ready(function () {
    $('#twitter-button').click(function () {
        loginTwitter($(this).data("language"), $(this).data("token"), $(this).data("content"), $(this).data("logintimeout"), $(this).data("redirectto"));
    });
});

function loginTwitter(languageId, token, contentId, loginTimeout, redirectTo) {
    $.ajax({
        url: "/umbraco/api/TwitterLoginButton/TwitterAuth",        
        data: JSON.stringify({
            languageId: languageId,
            contentId: contentId,
            loginTimeout: loginTimeout,
            redirectTo: redirectTo
        }),
        headers: { "RequestVerificationToken": token },
        type: 'POST',
        cache: false,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        async: true,        
        beforeSend: function () {
            $(".box").show();
        },
        success: function (data) {            
            window.open(data.url, 'about:blank', 'print_popup', 'width=600,height=800');
            $(".box").fadeOut();
        },
        error: function (data) {
            console.log(data);
            toastr.error(data.responseJSON.message);
            $(".box").fadeOut();
        },
        complete: function (data) {
            console.log(data);
        }
    });
}


