var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Przychody", "Wydatki", "Różnica"],
        datasets: [
            {
                label: "Styczeń",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [10000, -7000, 3000],
            },
            {
                label: "Luty",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [8000, -7500, 500],
            }
        ]
    },

    // Configuration options go here
    options: {}
});

var ctx = document.getElementById('mySummary').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Styczeń", "Luty", "Marzec"],
        datasets: [
            {
                label: "Suma",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [10000, -7000, 3000],
            },
        ]
    },

    // Configuration options go here
    options: {}
});
