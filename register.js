function addFunction() {
    var baseLink = "http://localhost:8080/user";
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
        url: baseLink,
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
    var clearImie = $('#name');
    var clearNazwisko = $('#lastName');
    var clearLogin = $('#login');
    var clearHasloParametr = $('#password');
    var clearPowtorzHasloParametr = $('#password-confirm');
    var clearEmailParametr = $('#email');
    clearImie.val("");
    clearNazwisko.val("");
    clearLogin.val("");
    clearHasloParametr.val("");
    clearPowtorzHasloParametr.val("");
    clearEmailParametr.val("");
    $('#new-user-alert').show();
}

$('#register').click(function () {
    var imieParametr = $('#name').val();
    var nazwiskoParametr = $("#lastName").val();
    var loginParametr = $("#login").val();
    var emailParametr = $('#email').val();
    var hasloParametr = $('#password').val();
    var powtorzHasloParametr = $('#password-confirm').val();
    console.log(imieParametr + " " + nazwiskoParametr + " " + loginParametr + " " + emailParametr + " " + hasloParametr + " " + powtorzHasloParametr);

    if (imieParametr && nazwiskoParametr && loginParametr && emailParametr && hasloParametr && powtorzHasloParametr) {
        if (hasloParametr === powtorzHasloParametr) {
            addFunction();
        }
        else {
            $('#bad-password-alert').show();
        }
    }
    else {
        $('#required-fields-error-alert').show();
    }
});

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