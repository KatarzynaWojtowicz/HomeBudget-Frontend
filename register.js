function addFunction() {
    var imieParametr = $('#name').val();
    var emailParametr = $('#email').val();
    var hasloParametr = $('#password').val();
    var baseLink = "http://localhost:8080/user/add";
    var addFunctionJson = '{"login":"' + imieParametr + '","password":"' + hasloParametr + '","email":"' + emailParametr + '"}';


    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
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
    var clearHasloParametr = $('#password');
    var clearPowtorzHasloParametr = $('#password-confirm');
    var clearEmailParametr = $('#email');
    clearImie.val("");
    clearHasloParametr.val("");
    clearPowtorzHasloParametr.val("");
    clearEmailParametr.val("");
    $('#new-user-alert').show();
}

$('#register').click(function () {
    var imieParametr = $('#name').val();
    var emailParametr = $('#email').val();
    var hasloParametr = $('#password').val();
    var powtorzHasloParametr = $('#password-confirm').val();
    console.log(imieParametr + " " + emailParametr + " " + hasloParametr + " " + powtorzHasloParametr);

    if (imieParametr && emailParametr && hasloParametr && powtorzHasloParametr) {
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