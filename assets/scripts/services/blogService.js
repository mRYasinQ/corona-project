import BaseUrls from '../constants/api.js';
import AppError from '../exception/AppError.js';

async function getBLogs(category = 'health', source = 'us.json') {
    const response = await fetch(`${BaseUrls.blogApi}/category/${category}/${source}`);
    if (!response.ok) {
        throw new AppError('Problem Exist.', response.status);
    }

    const blogs = await response.json();

    return blogs;
}

export { getBLogs };
