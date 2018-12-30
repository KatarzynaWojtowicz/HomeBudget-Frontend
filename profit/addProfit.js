function handleError(e) {
    if (e.status === 403 || e.status === 401) {
        alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
        window.location.pathname = "/signIn.html";
    } else {
        $('#new-profit-error-alert').show();
        console.log(e);
    }
}

function addFunction() {
    var baseLink = HOSTNAME + "api/profit/add";

    var nazwaParametr = $('#nowy-przychod-nazwa-input').val();
    var kwotaParametr = $('#nowy-przychod-kwota-input').val();
    var dataPrzychoduParametr = $('#datepicker').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kwota":' + kwotaParametr + ',"dataPrzychodu":"' + dataPrzychoduParametr + '"}';

    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
        contentType: "application/json",
        success: profitAddedFunction,
        xhrFields: { withCredentials: true },
        error: handleError
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