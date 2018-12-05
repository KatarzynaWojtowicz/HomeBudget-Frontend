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
        table.clear();
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


    function searchFunction() {
        var baseLink = "http://localhost:8080/profit/search";
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

        $.ajax({
            url: baseLink,
            success: addProfitToTableFunction,
            xhrFields: { withCredentials: true },
            error: function (e) {
                console.log(e);
            }
        });
    }

    function clearInputSearchFunction() {
        $('#nazwa-input').val("");
        $('#datepicker').val("");
    }

    function removeProfitFunction() {
        var baseLink = "http://localhost:8080/profit/delete";
        var idParametr = $('#').val();
        var whereParts = [];

        if (idParametr) {
            whereParts.push("/" + idParametr);
        }

        console.log(baseLink);

        $.ajax({
            url: baseLink,
            success: removeFunction,
            xhrFields: { withCredentials: true },
            error: function (e) {
                console.log(e);
            }
        });
    }

    function clearInputSearchFunction() {
        $('#nazwa-input').val("");
        $('#datepicker').val("");
    }

    $('#delete-button').click(function () {
        var baseLink = "http://localhost:8080/profit/delete/";
        var selectedRow = table.rows('.selected').data()[0];
        if (selectedRow === undefined) {
            $('#profit-error-alert').show();
        } else {
            var id = selectedRow[0];
            $.ajax({
                url: baseLink + id,
                type: 'DELETE',
                success: searchFunction,
                xhrFields: { withCredentials: true },
                error: function (e) {
                    console.log(e);
                }
            });
        }


    })


    $('#search-button').click(searchFunction);
    $('#clear-button').click(clearInputSearchFunction);
    searchFunction()

    $('#profit-error-alert-close').click(() => {
        $('#profit-error-alert').hide();
    })
})
