var ctx = document.getElementById('barChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: "Drinking Water Amount",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#FFFAFA',
                '#FFFAFA',
                '#FFFAFA',
                '#FFFAFA',
                '#FFFAFA',
                '#FFFAFA'
            ],  
            borderWidth: 1,
        }]
    },
    options: {
        scales: {
            x: {
                display: true,
                title: {
                display: true,
                text: 'Time Interval',
                color: '#911',
                font: {
                    //family: 'Comic Sans MS',
                    size: 20,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
                padding: {top: 20, left: 0, right: 0, bottom: 0}
            }
        },
        y: {
            beginAtZero: true,
            display: true,
            title: {
            display: true,
            text: 'Percentage',
            color: '#191',
            font: {
                //family: 'Open Sans', 
                // style: 'sans-serif',
                size: 15,
                lineHeight: 1.2
            },
            padding: {top: 30, left: 0, right: 0, bottom: 0}
            }
        }
    }
}
});