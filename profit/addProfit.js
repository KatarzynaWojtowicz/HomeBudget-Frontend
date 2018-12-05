function addFunction() {

    var baseLink = "http://localhost:8080/profit/add";
    var nazwaParametr = $('#nowy-przychod-nazwa-input').val();
    var kwotaParametr = $('#nowy-przychod-kwota-input').val();
    var dataPrzychoduParametr = $('#datepicker').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kwota":' + kwotaParametr + ',"dataPrzychodu":"' + dataPrzychoduParametr + '"}';

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
    $('#nowy-przychod-nazwa-input').val("");
    $('#nowy-przychod-kwota-input').val("");
    $('#datepicker').val("");

    $('#new-profit-alert').show();
}

$('#add-button').click(addFunction);

$('#new-profit-alert-close').click(function () {
    $('#new-profit-alert').hide();
});

$('#new-profit-error-alert-close').click(() => {
    $('#new-profit-error-alert').hide();
})

$("#datepicker").datepicker({
    showAnim: "slideDown",
    dateFormat: "dd.mm.yy"
});