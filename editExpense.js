var url = window.location.href;
var arrayUrl = url.split("?id=");
var id = arrayUrl[1];
var baseLink = "http://localhost:8080/expense/details/";
function fill(expense){
    $('#id-edit').val(expense.id);
    $('#nowy-wydatek-nazwa-input').val(expense.nazwa);
    $('#nowy-wydatek-kategoria-input').val(expense.kategoria);
    $('#nowy-wydatek-cena-input').val(expense.cena);
    $('#status-select').val(expense.status);
}

$.ajax({
    url: baseLink + id,
    success: fill,
    error: function (e) {
        console.log(e);
    }
});

function 