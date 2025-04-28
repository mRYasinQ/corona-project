import { setCountries } from './modules/countries.js';

document.addEventListener('DOMContentLoaded', async () => {
    await setCountries();

    const chart1 = document.getElementById('chart-1');
    const chart2 = document.getElementById('chart-2');

    const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug'];
    const config = {
        type: 'line',
        data: {
            datasets: null,
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                },
            },
        },
    };

    const chart1Data = {
        labels,
        datasets: [
            {
                data: [10, 25, 17, 34, 42, 27, 35, 41],
                borderColor: '#11e5b4',
                borderWidth: 2,
            },
        ],
    };
    const chart2Data = {
        labels,
        datasets: [
            {
                data: [60, 40, 49, 42, 52, 39, 28, 5],
                borderColor: '#F85252',
                borderWidth: 2,
            },
        ],
    };

    const chartAsc = new Chart(chart1, { ...config, data: chart1Data });
    const chartDesc = new Chart(chart2, { ...config, data: chart2Data });
});
