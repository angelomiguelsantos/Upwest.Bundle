$(document).ready(function () {
    $('#linkedin-button').click(function () {
        loginLinkedin($(this).data("language"), $(this).data("token"), $(this).data("content"), $(this).data("logintimeout"), $(this).data("redirectto"));
    });
});

function loginLinkedin(languageId,token,contentId,loginTimeout,redirectTo) {

    $.ajax({
        url: "/umbraco/api/LinkedinLoginButton/LinkedinAuth",
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
            toastr.error(data.responseJSON.message);
            $(".box").fadeOut();
        },
        complete: function (data) {
            $(".box").fadeOut();
        }
    });
}


