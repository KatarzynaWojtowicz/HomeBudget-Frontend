var table;

$(document).ready(function () {
    table = $('#profit-table').DataTable();
})
$('#profit-table').dataTable({
    "searching": false
});

function addProfitToTableFunction(profitList) {
    clearFunction();

    for (i = 0; i < profitList.length; i++) {
        var profit = profitList[i];
        table.row.add([profit.nazwa, profit.kwota, 0]).draw();
    }
    clearInputSearchFunction();
}

function clearFunction() {
    table.clear();
}



function searchFunction() {
    var baseLink = "http://localhost:8080/profit/search";
    var whereParts = [];
    var nazwaParametr = $('#nazwa-input').val();


    if (nazwaParametr) {
        whereParts.push("nazwa=" + nazwaParametr);
    }

    if (whereParts.length > 0) {
        baseLink += "?" + whereParts;
    }
    console.log(baseLink);

    $.ajax({
        url: baseLink,
        success: addProfitToTableFunction,
        error: function (e) {
            console.log(e);
        }
    });
}


function addFunction() {

    var baseLink = "http://localhost:8080/profit/add";
    var nazwaParametr = $('#nowy-przychod-nazwa-input').val();
    var kwotaParametr = $('#nowy-przychod-kwota-input').val();
    var addFunctionJson = '{"nazwa":"' + nazwaParametr + '","kwota":' + kwotaParametr + '}';

    console.log(addFunctionJson);

    $.ajax({
        type: "POST",
        url: baseLink,
        data: addFunctionJson,
        contentType: "application/json",
        success: profitAddedFunction,
        error: function (e) {
            $('#new-profit-error-alert').show();
            console.log(e);
        }

    })
}

function profitAddedFunction() {
    var clearNazwa = $('#nowy-przychod-nazwa-input');
    var clearKwota = $('#nowy-przychod-kwota-input');
    clearNazwa.val("");
    clearKwota.val("");
    $('#new-profit-alert').show();
}

function clearInputSearchFunction(){
    var clearNazwaInput = $('#nazwa-input');
    clearNazwaInput.val("");
}

$('#add-button').click(addFunction);
$('#new-profit-alert-close').click(function () {
    $('#new-profit-alert').hide();
});

$('#new-profit-error-alert-close').click(() => {
    $('#new-profit-error-alert').hide();
})

$('#search-button').click(searchFunction);
searchFunction();