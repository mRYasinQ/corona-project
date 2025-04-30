import AppError from '../exception/AppError.js';
import handleError from '../exception/handleError.js';
import DefaultCountry from '../constants/defaultCountry.js';
import displayStatistics from '../constants/displayStatistics.js';
import { getCountryStats } from '../services/statisticsService.js';
import { formatDate, getLastDayOfMonth } from '../utility/date.js';

const STATS_YEAR = 2021;
const filterForm = document.querySelector('.statistic-form');
const dateInput = filterForm.querySelector('input[type="date"]');
const countryStatsBox = document.querySelector('.statistic-content-bottom');
const todayStatsBox = document.querySelector('#today-statistic > .data-table-content');
const wordlStatsBox = document.querySelector('#world-statistic > .data-table-content');
const recoveredChart = document.querySelector('#chart-recovered');
const deathChart = document.querySelector('#chart-death');
let filterController = null;
let todayController = null;

async function initStatistics() {
    await showWorldStats();
    await showChartStats();

    filterForm?.addEventListener('submit', filterCountryStats);
}

async function filterCountryStats(event) {
    event.preventDefault();

    if (filterController) filterController.abort();
    if (todayController) todayController.abort();

    const formData = new FormData(filterForm);
    const iso = formData.get('country');
    const date = formData.get('date') || null;
    const today = formatDate(new Date());

    try {
        if (iso == DefaultCountry.value) throw new AppError('Select a country!');

        filterController = new AbortController();
        todayController = new AbortController();

        const [countryStats, todayCountryStats] = await Promise.all([
            getCountryStats(iso, date, filterController.signal),
            getCountryStats(iso, today, todayController.signal),
        ]);

        showFilterStats(countryStats);
        showBoxStats(todayCountryStats, todayStatsBox);
    } catch (error) {
        handleError(error);
    }
}

async function showWorldStats() {
    const wordlStats = await getCountryStats('0', getLastDayOfMonth(STATS_YEAR, 12));

    showBoxStats(wordlStats, wordlStatsBox);
}

async function showChartStats() {
    const month = [1, 2, 3, 4, 5, 6];

    const worldStats = await Promise.all(month.map((m) => getCountryStats('0', getLastDayOfMonth(STATS_YEAR, m))));

    const recovered = worldStats.map((stat) => stat?.data?.recovered ?? 0);
    const death = worldStats.map((stat) => stat?.data?.deaths ?? 0);

    createChart(recoveredChart, recovered, '#11e5b4');
    createChart(deathChart, death, '#F85252');
}

function showFilterStats(stats) {
    countryStatsBox.innerHTML = '';

    displayStatistics.forEach(({ label, keyData }) => {
        const value = stats.data[keyData] ?? 0;
        let valueClass = 'statistic-content-value';

        if (label === 'Death') {
            if (value >= 500) valueClass += ' text-yellow';
        }

        if (!dateInput.value) dateInput.value = stats.data['date'] ?? '';

        const statsElement = `
        <div class="statistic-content-data">
            <span class="${valueClass}">${value.toLocaleString()}</span>
            <span class="statistic-content-label">${label}</span>
        </div>`;
        countryStatsBox.insertAdjacentHTML('beforeend', statsElement);
    });
}

function showBoxStats(stats, dataBox) {
    dataBox.innerHTML = '';

    displayStatistics.forEach(({ label, keyData }) => {
        const value = stats.data[keyData] ?? 0;
        let valueClass = 'data-table-value';

        if (label === 'Death') {
            if (value >= 500) valueClass += ' text-yellow';
        }

        if (label === 'Recovered') {
            if (value >= 500) valueClass += ' text-primary';
        }

        const statsElement = `
        <div class="data-table-item">
            <span class="${valueClass}">${value.toLocaleString()}</span>
            <span class="data-table-label">${label}</span>
        </div>`;
        dataBox.insertAdjacentHTML('beforeend', statsElement);
    });
}

function createChart(chartElement, data, borderColor) {
    const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];
    const config = {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    data,
                    borderColor,
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    };

    const chart = new Chart(chartElement, config);

    return chart;
}

export { initStatistics };
