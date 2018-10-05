var url = window.location.href;
var arrayUrl = url.split("?id=");
var id = arrayUrl[1];
var baseLink = "http://localhost:8080/expense/details/" + id;

function fill(expense) {
    $('#id-edit').val(expense.id);
    $('#nowy-wydatek-nazwa-input').val(expense.nazwa);
    $('#nowy-wydatek-kategoria-input').val(expense.kategoria);
    $('#nowy-wydatek-cena-input').val(expense.cena);
    $('#status-select').val(expense.status);
}

$.ajax({
    url: baseLink,
    success: fill,
    error: function (e) {
        console.log(e);
    }
});

function saveFunction() {
    var id = $('#id-edit').val();
    var newNazwa = $('#nowy-wydatek-nazwa-input').val();
    var newKategoria = $('#nowy-wydatek-kategoria-input').val();
    var newCena = $('#nowy-wydatek-cena-input').val();
    var newStatus = $('#status-select').val();
    var baseLink = "http://localhost:8080/expense/edit/" + id;
    var saveFunctionJson = '{"id":"' + id + '","nazwa":"' + newNazwa + '","kategoria":"' + newKategoria + '","cena":' + newCena + ',"status":"' + newStatus + '"}';
    console.log(saveFunctionJson);

    $.ajax({
        type: "PUT",
        url: baseLink,
        data: saveFunctionJson,
        contentType: "application/json",
        success: function () { window.location.pathname = "expense.html" },
        error: function (e) {
            $('#edit-expense-error-alert').show();
            console.log(e);
        }

    })
}

$('#save-button').click(saveFunction);