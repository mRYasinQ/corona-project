import AppError from '../exception/AppError.js';
import handleError from '../exception/handleError.js';
import DefaultCountry from '../constants/defaultCountry.js';
import displayStatistics from '../constants/displayStatistics.js';
import { getCountryStats } from '../services/statisticsService.js';

const filterForm = document.querySelector('.statistic-form');
const dateInput = filterForm.querySelector('input[type="date"]');
const countryStatsBox = document.querySelector('.statistic-content-bottom');
let filterCStatsController = null;

async function initStatistics() {
    filterForm?.addEventListener('submit', filterCountryStats);
}

async function filterCountryStats(event) {
    event.preventDefault();

    if (filterCStatsController) {
        filterCStatsController.abort();
    }

    const formData = new FormData(filterForm);
    const iso = formData.get('country');
    const date = formData.get('date') || null;

    try {
        if (iso == DefaultCountry.value) throw new AppError('Select a country!');

        filterCStatsController = new AbortController();
        const countryStats = await getCountryStats(iso, date, filterCStatsController.signal);

        showCountryStats(countryStats);
    } catch (error) {
        handleError(error);
    }
}

function showCountryStats(stats) {
    countryStatsBox.innerHTML = '';

    displayStatistics.forEach(({ label, keyData }) => {
        const value = stats.data[keyData] ?? 'N/N';
        let valueClass = 'statistic-content-value';

        if (label === 'Death' && typeof value === 'number') {
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

export { initStatistics };
