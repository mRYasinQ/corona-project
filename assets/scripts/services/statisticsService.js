import BaseUrls from '../constants/api.js';
import AppError from '../exception/AppError.js';

async function getCountryStats(iso, date, signal) {
    const response = await fetch(`${BaseUrls.covidApi}/reports/total?iso=${iso}${date ? `&date=${date}` : ''}`, {
        signal,
    });
    if (!response.ok) {
        throw new AppError('Problem Exist.', response.status);
    }

    const countryStats = await response.json();

    return countryStats;
}

export { getCountryStats };
