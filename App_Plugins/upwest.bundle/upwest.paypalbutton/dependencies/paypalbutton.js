function initPayPalButton(token) {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'blue',
            layout: 'vertical',
            label: 'paypal',
        },
        createOrder: function (data, actions) {
            return actions.order.create({                
                purchase_units: [{ "description": "Upwest.Bundle", "amount": { "currency_code": "EUR", "value": 147.6, "breakdown": { "item_total": { "currency_code": "EUR", "value": 120 }, "shipping": { "currency_code": "EUR", "value": 0 }, "tax_total": { "currency_code": "EUR", "value": 27.6 } } } }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
                $.ajax({
                    url: "/umbraco/api/PayPalButton/Redirect",
                    type: 'POST',
                    cache: false,
                    dataType: "json",
                    data: JSON.stringify(orderData),
                    async: true,
                    headers: { "RequestVerificationToken": token },
                    contentType: 'application/json',
                    success: function (data) {
                        location.reload(false);
                    },
                    error: function (data) {

                    }
                });
            });
        },
        onError: function (err) {
            alert(JSON.stringify(err));
        }
    }).render('#paypal-button-container');
}

$(document).ready(function () {

    $('#btnSendLicense').click(function (e) {

        if (!$("#frmSendLicense").valid()) {
            return false;
        }

        $.ajax({
            url: "/umbraco/api/PayPalButton/CreateLicense",
            type: 'POST',
            cache: false,
            dataType: "json",
            data: JSON.stringify($('#frmSendLicense').serializeObject()),
            async: true,
            headers: { "RequestVerificationToken": $(this).data("token") },
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $("#btnSendLicense").prop('disabled', true);
                $("#btnSendLicense").text("Generating...");
            },
            success: function (data) {                
                if (data === "false") {
                    toastr.error("<b>Error generating key</b><br/>Please check your domain.");
                    $("#btnSendLicense").prop('disabled', false);
                    $("#btnSendLicense").text("Generate my license key again");
                    $("#frmSendLicense")[0].reset();
                }
                else {
                    toastr.success("<b>Success generating key</b><br/>Please consult your email.");
                    $("#btnSendLicense").text("Success!");                    
                    $("#keyArea").show();
                    $("#key").val(data);
                }
            },
            error: function (data) {
                $("#btnSendLicense").prop('disabled', false);
                $("#btnSendLicense").text("Error");
                alert(JSON.stringify(data));
            },
            complete: function (data) {

            }
        });
    });

    $("#btnCopy").click(function () {
        $("#key").select();
        document.execCommand('copy');
    });


});



