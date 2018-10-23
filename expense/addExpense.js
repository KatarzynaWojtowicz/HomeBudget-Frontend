function addFunction() {

    var baseLink = "http://localhost:8080/expense/add";
    var nazwaParametr = $('#nowy-wydatek-nazwa-input').val();
    var kategoriaParametr = $('#nowy-wydatek-kategoria-input').val();
    var cenaParametr = $('#nowy-wydatek-cena-input').val();
    var statusParametr = $('#status-select').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kategoria":"' + kategoriaParametr + '","cena":' + cenaParametr + ',"status":"' + statusParametr + '"}';

    console.log(addFunctionJson);

    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
        contentType: "application/json",
        success: expenseAddedFunction,
        error: function (e) {
            $('#new-expense-error-alert').show();
            console.log(e);
        }

    })
}

function expenseAddedFunction() {
    var clearNazwa = $('#nowy-wydatek-nazwa-input');
    var clearKategoria = $('#nowy-wydatek-kategoria-input');
    var clearCena = $('#nowy-wydatek-cena-input');
    var clearStatus = $('#nowy-wydatek-status-input');
    clearNazwa.val("");
    clearKategoria.val("");
    clearCena.val("");
    clearStatus.val("");
    $('#new-expense-alert').show();
}

$('#add-button').click(addFunction);
$('#new-expense-alert-close').click(function () {
    $('#new-expense-alert').hide();
});

$('#new-expense-error-alert-close').click(() => {
    $('#new-expense-error-alert').hide();
});