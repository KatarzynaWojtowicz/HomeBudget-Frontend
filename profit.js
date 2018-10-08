var table;

$(document).ready(function () {
    table = $('#profit-table').DataTable({
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
    $('#add-button').click(addFunction);

    $('#new-profit-alert-close').click(function () {
        $('#new-profit-alert').hide();
    });

    $('#new-profit-error-alert-close').click(() => {
        $('#new-profit-error-alert').hide();
    })

    $('#search-button').click(searchFunction);
    searchFunction()
})
