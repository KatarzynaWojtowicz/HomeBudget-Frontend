function addFunction() {
    var registerObject = {
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        login: $('#login').val(),
        password: $('#password').val(),
        email: $('#email').val()
    };

    var jsonString = JSON.stringify(registerObject);
    $.ajax({
        type: "POST",
        url: HOSTNAME + "public/user",
        data: jsonString,
        contentType: "application/json",
        success: userAddedFunction,
        error: function (e) {
            $('#new-user-error-alert').show();
            console.log(e);
        }
    })
}

function userAddedFunction() {
    $('#name').val("");
    $('#lastName').val("");
    $('#login').val("");
    $('#password').val("");
    $('#password-confirm').val("");
    $('#email').val("");
    $('#new-user-alert').show();
}

$('#register').click(function () {
    var imieParametr = $('#name').val();
    var nazwiskoParametr = $("#lastName").val();
    var loginParametr = $("#login").val();
    var emailParametr = $('#email').val();
    var hasloParametr = $('#password').val();
    var powtorzHasloParametr = $('#password-confirm').val();

    if (!isValid(imieParametr, nazwiskoParametr, loginParametr, emailParametr, hasloParametr, powtorzHasloParametr)) {
        showInvalidFormError();
        return;
    }
    
    if (!passwordsAreEqual(hasloParametr, powtorzHasloParametr)) {
        showPasswordNotMatchingError();
        return;
    }

    addFunction();
});

function isValid(imieParametr, nazwiskoParametr, loginParametr, emailParametr, hasloParametr, powtorzHasloParametr) {
    return imieParametr && nazwiskoParametr && loginParametr && emailParametr && hasloParametr && powtorzHasloParametr;
}

function passwordsAreEqual(haslo, powtorzHaslo) {
    return haslo === powtorzHaslo;
}

function showInvalidFormError() {
    $('#required-fields-error-alert').show();
}

function showPasswordNotMatchingError() {
    $('#bad-password-alert').show();
}

$('#new-user-alert-close').click(function () {
    $('#new-user-alert').hide();
});

$('#new-user-error-alert-close').click(() => {
    $('#new-user-error-alert').hide();
})

$('#bad-password-alert-close').click(function () {
    $('#bad-password-alert').hide();
});

$('#required-fields-error-alert-close').click(function () {
    $('#required-fields-error-alert').hide();
});