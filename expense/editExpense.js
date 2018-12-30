var url = window.location.href;
var arrayUrl = url.split("?id=");
var id = arrayUrl[1];
var baseLink = HOSTNAME + "api/expense/details/" + id;

function fill(expense) {
    $('#id-edit').val(expense.id);
    $('#nowy-wydatek-nazwa-input').val(expense.nazwa);
    $('#nowy-wydatek-kategoria-input').val(expense.kategoria);
    $('#nowy-wydatek-cena-input').val(expense.cena);
    $('#status-select').val(expense.status);
    $('#datepicker').val(expense.dataWydatku);
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

function saveFunction() {
    var id = $('#id-edit').val();
    var newNazwa = $('#nowy-wydatek-nazwa-input').val();
    var newKategoria = $('#nowy-wydatek-kategoria-input').val();
    var newCena = $('#nowy-wydatek-cena-input').val();
    var newStatus = $('#status-select').val();
    var newDate =  $('#datepicker').val();
    var baseLink = HOSTNAME + "api/expense/edit/" + id;
    var saveFunctionJson = '{"id":"' + id + '","nazwa":"' + newNazwa + '","kategoria":"' + newKategoria + '","cena":' + newCena + ',"status":"' + newStatus + '","dataWydatku":"' + newDate + '"}';
    console.log(saveFunctionJson);

    $.ajax({
        type: "PUT",
        url: baseLink,
        data: saveFunctionJson,
        headers: { 'Content-Type': 'application/json' },
        success: function () { window.location.pathname = "expense/expense.html" },
        xhrFields: { withCredentials: true },
        error: (e) => handleErrorWithAlert(e, '#edit-expense-error-alert')
    })
}

$('#save-button').click(saveFunction);