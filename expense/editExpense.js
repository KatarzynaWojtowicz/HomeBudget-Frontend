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
    var baseLink = "http://localhost:8080/expense/edit/" + id;
    var saveFunctionJson = '{"id":"' + id + '","nazwa":"' + newNazwa + '","kategoria":"' + newKategoria + '","cena":' + newCena + ',"status":"' + newStatus + '"}';
    console.log(saveFunctionJson);

    $.ajax({
        type: "PUT",
        url: baseLink,
        data: saveFunctionJson,
        contentType: "application/json",
        success: function () { window.location.pathname = "expense/expense.html" },
        xhrFields: { withCredentials: true },
        error: function (e) {
            if (e.status === 403 || e.status === 401) {
                alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
                window.location.pathname = "/signIn.html";
            } else {
                $('#edit-expense-error-alert').show();
                console.log(e);
            }
        }

    })
}

$('#save-button').click(saveFunction);