var url = window.location.href;
var arrayUrl = url.split("?id=");
var id = arrayUrl[1];
var baseLink = "http://localhost:8080/profit/details/" + id;

function fill(profit) {
    $('#id-edit').val(profit.idprofit);
    $('#nowy-przychod-nazwa-input').val(profit.nazwa);
    $('#nowy-przychod-kwota-input').val(profit.kwota);
}

$.ajax({
    url: baseLink,
    success: fill,
    xhrFields: { withCredentials: true },
    error: function (e) {
        if (e.status === 403 || e.status === 401) {
            alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
            window.location.pathname = "/signIn.html";
        } else {
            console.log(e);
        }
    }
});

function saveFunction() {
    var id = $('#id-edit').val();
    var newNazwa = $('#nowy-przychod-nazwa-input').val();
    var newKwota = $('#nowy-przychod-kwota-input').val();
    var baseLink = "http://localhost:8080/profit/edit/" + id;
    var saveFunctionJson = '{"idprofit":"' + id + '","nazwa":"' + newNazwa + '","kwota":' + newKwota + '}';
    console.log(saveFunctionJson);

    $.ajax({
        type: "PUT",
        url: baseLink,
        data: saveFunctionJson,
        contentType: "application/json",
        success: function () { window.location.pathname = "profit/profit.html" },
        xhrFields: { withCredentials: true },
        error: function (e) {
            if (e.status === 403 || e.status === 401) {
                alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
                window.location.pathname = "/signIn.html";
            } else {
                $('#edit-profit-error-alert').show();
                console.log(e);
            }
        }

    })
}

$('#save-button').click(saveFunction);