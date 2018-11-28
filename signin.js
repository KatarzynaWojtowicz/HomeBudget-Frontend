function loginFunction() {
    var loginParametr = $('#inputLogin').val();
    var passwordParametr = $('#inputPassword').val();
    var baseLink = "http://localhost:8080/user/login";
    var loginFunctionJson = "usernname=" + loginParametr + "&password=" + passwordParametr + "&submit=Login";
    console.log(loginFunctionJson);

    $.ajax({
        type: "POST",
        url: baseLink,
        data: loginFunctionJson,
        contentType: "application/x-www-form-urlencoded",
        success: loginUserFunction,
        error: function (e) {
            $('#login-error-alert').show();
            console.log(e);
        }

    })
}

function loginUserFunction() {
    var clearLogin = $('#inputLogin');
    var clearPassword = $('#inputPassword');

    clearLogin.val("");
    clearPassword.val("");

    $('#login-alert').show();
}


$('#signin').click(function () {
    loginFunction();
})


$('#required-fields-error-alert-close').click(function () {
    $('#required-fields-error-alert').hide();
});

$('#login-error-alert-close').click(function () {
    $('#login-error-alert').hide();
});

$('#login-alert-close').click(function () {
    $('#login-alert').hide();
});