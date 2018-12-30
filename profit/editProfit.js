var url = window.location.href;
var arrayUrl = url.split("?id=");
var id = arrayUrl[1];
var baseLink = HOSTNAME + "api/profit/details/" + id;

function fill(profit) {
    $('#id-edit').val(profit.idprofit);
    $('#nowy-przychod-nazwa-input').val(profit.nazwa);
    $('#nowy-przychod-kwota-input').val(profit.kwota);
    $('#datepicker').val(profit.dataPrzychodu);
}

$.ajax({
    url: baseLink,
    success: fill,
    xhrFields: { withCredentials: true },
    error: handleError
});

$("#datepicker").datepicker({
    showAnim: "slideDown",
    dateFormat: "dd.mm.yy"
});

function handleError(e) {
    if (e.status === 403 || e.status === 401) {
        alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
        window.location.pathname = "/signIn.html";
    } else {
        console.log(e);
    }
}

function handlePutError(e) {
    if (e.status === 403 || e.status === 401) {
        alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
        window.location.pathname = "/signIn.html";
    }
    else {
        $('#edit-profit-error-alert').show();
        console.log(e);
    }
}

function saveFunction() {
    var id = $('#id-edit').val();
    var newNazwa = $('#nowy-przychod-nazwa-input').val();
    var newKwota = $('#nowy-przychod-kwota-input').val();
    var newDate = $('#datepicker').val();
    var baseLink = HOSTNAME + "api/profit/edit/" + id;
    var saveFunctionJson = '{"idprofit":"' + id + '","nazwa":"' + newNazwa + '","kwota":' + newKwota + ',"dataPrzychodu":"' + newDate + '"}';

    $.ajax({
        type: "PUT",
        url: baseLink,
        data: saveFunctionJson,
        contentType: "application/json",
        success: function () { window.location.pathname = "profit/profit.html" },
        xhrFields: { withCredentials: true },
        error: handlePutError
    })
}

$('#save-button').click(saveFunction);