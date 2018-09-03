var table;

$(document).ready(function () {
    table = $('#expenses-table').DataTable({
        searching: false,
        buttons: [
            {
                text: 'Reload',
                action: function (e, dt, node, config) {
                    alert('halo');
                }
            }
        ]
    });

})


function clearFunction() {
    table.clear();
}

function addExpensesToTableFunction(expenseList) {
    clearFunction();

    for (i = 0; i < expenseList.length; i++) {
        var expense = expenseList[i];
        table.row.add([expense.id, expense.nazwa, expense.kategoria, expense.cena, expense.status, null]).draw();
    }
    
    table.buttons().container()
        .appendTo($('tbody tr td:last-child', table.table().container()));
    clearInputSearchFunction();
}

function searchFunction() {
    var baseLink = "http://localhost:8080/expense/search";
    var whereParts = [];
    var statusParametr = $('#status-select').val();
    var kategoriaParametr = $('#kategoria-input').val();
    var nazwaParametr = $('#nazwa-input').val();

    if (statusParametr) {
        whereParts.push("status=" + statusParametr);
    }

    if (kategoriaParametr) {
        whereParts.push("kategoria=" + kategoriaParametr);
    }

    if (nazwaParametr) {
        whereParts.push("nazwa=" + nazwaParametr);
    }

    if (whereParts.length > 0) {
        baseLink += "?" + whereParts.join('&');
    }
    console.log(baseLink);

    $.ajax({
        url: baseLink,
        success: addExpensesToTableFunction,
        error: function (e) {
            console.log(e);
        }
    });
}

function clearInputSearchFunction() {
    var clearKategoriaInput = $('#kategoria-input');
    var clearNazwaInput = $('#nazwa-input');
    var clearStatusSelect = $('#status-select');
    clearKategoriaInput.val("");
    clearNazwaInput.val("");
    clearStatusSelect.val("");
}

$('#search-button').click(searchFunction);
$('#clear-button').click(clearFunction);
searchFunction();