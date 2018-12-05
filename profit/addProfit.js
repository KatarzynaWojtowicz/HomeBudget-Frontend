function addFunction() {

    var baseLink = "http://localhost:8080/profit/add";
    var nazwaParametr = $('#nowy-przychod-nazwa-input').val();
    var kwotaParametr = $('#nowy-przychod-kwota-input').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kwota":' + kwotaParametr + '}';

    console.log(addFunctionJson);

    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
        contentType: "application/json",
        success: profitAddedFunction,
        xhrFields: { withCredentials: true },
        error: function (e) {
            $('#new-profit-error-alert').show();
            console.log(e);
        }

    })
}


function profitAddedFunction() {
    var clearNazwa = $('#nowy-przychod-nazwa-input');
    var clearKwota = $('#nowy-przychod-kwota-input');
    clearNazwa.val("");
    clearKwota.val("");
    $('#new-profit-alert').show();
}

$('#add-button').click(addFunction);

$('#new-profit-alert-close').click(function () {
    $('#new-profit-alert').hide();
});

$('#new-profit-error-alert-close').click(() => {
    $('#new-profit-error-alert').hide();
})