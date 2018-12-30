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

    $("#datepicker").datepicker({
        showAnim: "slideDown",
        dateFormat: "dd.mm.yy"
    });


    function clearFunction() {
        table.clear().draw();
    }

    function addExpensesToTableFunction(expenseList) {
        console.log(expenseList);
        clearFunction();

        for (i = 0; i < expenseList.length; i++) {
            var expense = expenseList[i];
            table.row.add([expense.id, expense.dataWydatku, expense.nazwa, expense.kategoria, expense.cena, expense.status]).draw();
        }

        clearInputSearchFunction();
    }

    function handleError(e) {
        if (e.status === 403 || e.status === 401) {
            alert("Musisz być zalogowany aby mieć dostęp do tej strony.");
            window.location.pathname = "/signIn.html";
        } else {
            console.log(e);
        }
    }

    function buildUrl() {
        var baseLink = HOSTNAME + "api/expense/search";

        var whereParts = [];
        var statusParametr = $('#status-select').val();
        var kategoriaParametr = $('#kategoria-input').val();
        var nazwaParametr = $('#nazwa-input').val();
        var dataParametr = $('#datepicker').val();

        if (statusParametr) {
            whereParts.push("status=" + statusParametr);
        }
        if (kategoriaParametr) {
            whereParts.push("kategoria=" + kategoriaParametr);
        }
        if (nazwaParametr) {
            whereParts.push("nazwa=" + nazwaParametr);
        }
        if (dataParametr) {
            whereParts.push("data-wydatku=" + dataParametr);
        }
        if (whereParts.length > 0) {
            baseLink += "?" + whereParts.join('&');
        }
        return baseLink;
    }

    function searchFunction() {
        var url = buildUrl();
        $.ajax({
            url: url,
            success: addExpensesToTableFunction,
            xhrFields: { withCredentials: true },
            error: handleError
        });
    }

    function clearInputSearchFunction() {
        $('#kategoria-input').val("");
        $('#nazwa-input').val("");
        $('#status-select').val("");
        $('#datepicker').val("");
    }

    $('#delete-button').click(function () {
        var baseLink = HOSTNAME + "api/expense/delete/";
        var selectedRow = table.rows('.selected').data()[0];
        if (selectedRow === undefined) {
            $('#expense-error-alert').show();
        } else {
            var id = selectedRow[0];
            $.ajax({
                url: baseLink + id,
                type: 'DELETE',
                success: searchFunction,
                xhrFields: { withCredentials: true },
                error: handleError
            });
        }
    });

    $('#search-button').click(searchFunction);
    $('#clear-button').click(clearInputSearchFunction);
    searchFunction();

    $('#expense-error-alert-close').click(function () {
        $('#expense-error-alert').hide();
    });
})
