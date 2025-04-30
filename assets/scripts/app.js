import handleError from './exception/handleError.js';
import { setLoading } from './modules/loading.js';
import { initCountries } from './modules/countries.js';
import { initStatistics } from './modules/statistics.js';
import { initBlogs } from './modules/blog.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        setLoading(true);

        await initCountries();
        await initStatistics();
        await initBlogs();
    } catch (error) {
        handleError(error);
    } finally {
        setLoading(false);
    }
});
