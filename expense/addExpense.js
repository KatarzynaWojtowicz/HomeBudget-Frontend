function addFunction() {
    var baseLink = HOSTNAME + "api/expense/add";

    var nazwaParametr = $('#nowy-wydatek-nazwa-input').val();
    var kategoriaParametr = $('#nowy-wydatek-kategoria-input').val();
    var cenaParametr = $('#nowy-wydatek-cena-input').val();
    var statusParametr = $('#status-select').val();
    var dataParametr = $('#datepicker').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kategoria":"' + kategoriaParametr + '","cena":' + cenaParametr + ',"status":"' + statusParametr + '","dataWydatku":"' + dataParametr + '"}';

    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
        contentType: "application/json",
        success: clearFieldsAndShowAlert,
        xhrFields: { withCredentials: true },
        error: (e) => handleErrorWithAlert(e, '#new-expense-error-alert')
    })
}

function clearFieldsAndShowAlert() {
    $('#nowy-wydatek-nazwa-input').val("");
    $('#nowy-wydatek-kategoria-input').val("");
    $('#nowy-wydatek-cena-input').val("");
    $('#nowy-wydatek-status-input').val("");
    $('#datepicker').val("");

    $('#new-expense-alert').show();
}

$('#add-button').click(addFunction);
$('#new-expense-alert-close').click(function () {
    $('#new-expense-alert').hide();
});

$('#new-expense-error-alert-close').click(() => {
    $('#new-expense-error-alert').hide();
});

$("#datepicker").datepicker({
    showAnim: "slideDown",
    dateFormat: "dd.mm.yy"
});