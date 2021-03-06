var table;

$(document).ready(function () {
    table = $('#profit-table').DataTable({
        searching: false,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf',
        ]
    });


    function clearFunction() {
        table.clear().draw();
    }

    function addProfitToTableFunction(profitList) {
        clearFunction();

        for (i = 0; i < profitList.length; i++) {
            var profit = profitList[i];
            table.row.add([profit.idprofit, profit.nazwa, profit.kwota, profit.dataPrzychodu]).draw();
        }
        clearInputSearchFunction();
    }


    $('#profit-table tbody').on('click', 'tr', function () {
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
            $('#profit-error-alert').show();
        } else {
            var id = selectedRow[0];
            window.location.href = window.location.origin + "/profit/edit-profit?id=" + encodeURIComponent(id);
        }
    });

    $("#datepicker").datepicker({
        showAnim: "slideDown",
        dateFormat: "dd.mm.yy"
    });

    function buildUrl() {
        var baseLink = HOSTNAME + "api/profit/search";
        var whereParts = [];
        var nazwaParametr = $('#nazwa-input').val();
        var dataParametr = $('#datepicker').val();
        if (nazwaParametr) {
            whereParts.push("nazwa=" + nazwaParametr);
        }
        if (dataParametr) {
            whereParts.push("data-przychodu=" + dataParametr);
        }
        if (whereParts.length > 0) {
            baseLink += "?" + whereParts;
        }
        return baseLink;
    }

    function searchFunction() {
        var url = buildUrl();

        $.ajax({
            url: url,
            success: addProfitToTableFunction,
            xhrFields: { withCredentials: true },
            error: handleError
        });
    }

    function clearInputSearchFunction() {
        $('#nazwa-input').val("");
        $('#datepicker').val("");
    }

    function clearInputSearchFunction() {
        $('#nazwa-input').val("");
        $('#datepicker').val("");
    }

    $('#delete-button').click(function () {
        var baseLink = HOSTNAME + "api/profit/delete/";

        var selectedRow = table.rows('.selected').data()[0];
        if (selectedRow === undefined) {
            $('#profit-error-alert').show();
            return;
        }

        var id = selectedRow[0];
        $.ajax({
            url: baseLink + id,
            type: 'DELETE',
            success: searchFunction,
            xhrFields: { withCredentials: true },
            error: handleError
        });
    })


    $('#search-button').click(searchFunction);
    $('#clear-button').click(clearInputSearchFunction);
    searchFunction()

    $('#profit-error-alert-close').click(() => {
        $('#profit-error-alert').hide();
    })
})
