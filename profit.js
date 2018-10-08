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
            table.row.add([profit.idprofit, profit.nazwa, profit.kwota]).draw();
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
            window.location.href = window.location.origin + "/edit-profit?id=" + encodeURIComponent(id);
        }
    });




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

    function clearInputSearchFunction() {
        var clearNazwaInput = $('#nazwa-input');
        clearNazwaInput.val("");
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
            error: function (e) {
                console.log(e);
            }
        });
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
                error: function (e) {
                    console.log(e);
                }
            });
        }


    })


    $('#search-button').click(searchFunction);
    searchFunction()
})
