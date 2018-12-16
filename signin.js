function loginFunction() {
    var loginParametr = $('#inputLogin').val();
    var passwordParametr = $('#inputPassword').val();
    var baseLink = "http://localhost:8080/public/login";
    var loginData = "username=" + loginParametr + "&password=" + passwordParametr;

    $.ajax({
        type: "POST",
        url: baseLink,
        data: loginData,
        success: loginUserFunction,
        xhrFields: { withCredentials: true },
        error: function (e) {
            $('#login-error-alert').show();
            console.log(e);
        }
    });
}

function loginUserFunction() {
    window.location.pathname = "/expense/expense.html";
}

function logout(){
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/public/logout",
        xhrFields: { withCredentials: true },
        success: () => {},
        error: (e) => console.log(e) 
    });
}

$(document).ready(function () {
    logout();
});

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