function getRandomRGB() {
    var r = Math.floor((Math.random() * 255));
    var g = Math.floor((Math.random() * 255));
    var b = Math.floor((Math.random() * 255));
    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.4)'
}

// ajax
$.ajax({
    url: "http://localhost:8080/summary/monthly",
    success: createMonthlySummaryData,
    xhrFields: { withCredentials: true },
    error: (e) => console.log(e)
});
function createMonthlySummaryData(monhtlySummaryList) {
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
        }
        monthlySummaryData.push(summaryObject);
    }
    monthlySummaryData.sort();

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