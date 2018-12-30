function getRandomRGB() {
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = Math.floor((Math.random() * 255));
    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.4)'
}

$.ajax({
    url: HOSTNAME + "api/summary/monthly",
    success: function (results) {
        createMonthlySummaryData(results);
        createMonthlyComparisonData(results);
    },
    xhrFields: { withCredentials: true },
    error: handleError
});

function createMonthlySummaryData(monhtlySummaryList) {
    sortSummaryList(monhtlySummaryList);

    var monthlySummaryData = convertToChartJsDataSets(monhtlySummaryList);

    var monthlySummaryCtx = document.getElementById('monthlySummaryChart').getContext('2d');
    var monthlySummaryChart = new Chart(monthlySummaryCtx, {
        type: 'bar',
        data: {
            labels: ["Przychody", "Wydatki", "Różnica"],
            datasets: monthlySummaryData
        },
        options: {}
    });
}

function convertToChartJsDataSets(monhtlySummaryList) {
    var monthlySummaryData = [];
    for (var i = 0; i < monhtlySummaryList.length; i++) {
        var profitValue = parseInt(monhtlySummaryList[i].profits, 10);
        var expenseValue = parseInt(monhtlySummaryList[i].expenses > 0 ? -monhtlySummaryList[i].expenses : 0, 10);
        var rgbColor = getRandomRGB();
        var summaryObject = {
            label: monhtlySummaryList[i].monthName,
            backgroundColor: rgbColor,
            borderColor: rgbColor,
            data: [profitValue, expenseValue, profitValue + expenseValue]
        };
        monthlySummaryData.push(summaryObject);
    }
    return monthlySummaryData;
}

function sortSummaryList(monhtlySummaryList) {
    monhtlySummaryList.sort((a, b) => {
        if (a.monthName > b.monthName) {
            return 1;
        }
        return -1;
    });
}

function createMonthlyComparisonData(monhtlyComparisonList) {
    var monthNames = [];
    var datasetObject = createComparisonDataSets(monhtlyComparisonList, monthNames);

    var monthlyComparisonCtx = document.getElementById('monthlyComparisonChart').getContext('2d');
    var monthlyComparisonChart = new Chart(monthlyComparisonCtx, {
        type: 'line',
        data: {
            labels: monthNames,
            datasets: [datasetObject]
        },
        options: {}
    });
}


function createComparisonDataSets(monhtlyComparisonList, monthNames) {
    var monthValues = [];
    for (var i = 0; i < monhtlyComparisonList.length; i++) {
        var profitValue = parseInt(monhtlyComparisonList[i].profits, 10);
        var expenseValue = parseInt(monhtlyComparisonList[i].expenses > 0 ? -monhtlyComparisonList[i].expenses : 0, 10);
        monthNames.push(monhtlyComparisonList[i].monthName);
        monthValues.push(profitValue + expenseValue);
    }
    var datasetObject = {
        label: "Bilans miesiąca",
        data: monthValues
    };
    return datasetObject;
}
