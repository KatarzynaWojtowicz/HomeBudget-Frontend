var table;


$(document).ready(function () {
    table = $('#expenses-table').DataTable({
        searching: false,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf',
        ]
    });


    $('#expenses-table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#edit-button').click(function () {
        var selectedRow = table.rows('.selected').data()[0];
        if (selectedRow === undefined) {
            $('#expense-error-alert').show();
        } else {
            var id = selectedRow[0];
            window.location.href = window.location.origin + "/expense/edit-expense?id=" + encodeURIComponent(id);
        }
    });



    function clearFunction() {
        table.clear();
    }

    function addExpensesToTableFunction(expenseList) {
        console.log(expenseList);
        clearFunction();

        for (i = 0; i < expenseList.length; i++) {
            var expense = expenseList[i];
            table.row.add([expense.id, expense.nazwa, expense.kategoria, expense.cena, expense.status]).draw();
        }

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


    $('#delete-button').click(function () {
        var baseLink = "http://localhost:8080/expense/delete/";
        var selectedRow = table.rows('.selected').data()[0];
        if (selectedRow === undefined) {
            $('#expense-error-alert').show();
        } else {
            var id = selectedRow[0];
            $.ajax({
                url: baseLink + id,
                type: 'DELETE',
                success: searchFunction,
                error: function (e) {
                    console.log(e);
                }
            });
        }
    });


    $('#search-button').click(searchFunction);
    $('#clear-button').click(clearFunction);
    searchFunction();

    $('#expense-error-alert-close').click(function () {
        $('#expense-error-alert').hide();
    });
})