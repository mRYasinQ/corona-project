import { getBLogs } from '../services/blogService.js';
import defaultImage from '../constants/defaultImage.js';
import { formatDate } from '../utility/date.js';

const blogContent = document.querySelector('.blog > .blog-content');

async function initBlogs() {
    await showBlogs();
}

async function showBlogs() {
    let blogs = await getBLogs();
    blogs = blogs.articles.slice(-5);

    createBlogs(blogs);
}

function createBlogs(blogs) {
    blogContent.innerHTML = '';

    blogs.forEach((blog) => {
        const blogElement = `
        <div class="blog-item">
            <div class="blog-card">
                <figure class="blog-card-figure">
                    <img src="${blog.urlToImage}" alt="blog image" onerror="this.src = '${defaultImage.src}';" />
                </figure>
                <div class="blog-card-content">
                    <h3 class="blog-card-title">
                        <a class="blog-card-link" href="${blog.url}">${blog.title}</a>
                    </h3>
                    <div class="blog-card-info">
                        <div class="blog-card-data">
                            <span class="icon icon-small">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 22">
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-width="1.5"
                                        d="M6 12h8M6 8h8m-8 8h4M6 1v3m8-3v3M5 21h10a4 4 0 0 0 4-4V6.5a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4V17a4 4 0 0 0 4 4Z"
                                    />
                                </svg>
                            </span>
                            <span class="blog-card-value">${formatDate(blog.publishedAt, 'Y/M/D')}</span>
                        </div>
                        <div class="blog-card-data">
                            <span class="icon icon-small">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                    <path
                                        fill="currentColor"
                                        d="M11.25 5A3.25 3.25 0 0 1 8 8.25v1.5A4.75 4.75 0 0 0 12.75 5h-1.5ZM8 8.25A3.25 3.25 0 0 1 4.75 5h-1.5A4.75 4.75 0 0 0 8 9.75v-1.5ZM4.75 5A3.25 3.25 0 0 1 8 1.75V.25A4.75 4.75 0 0 0 3.25 5h1.5ZM8 1.75A3.25 3.25 0 0 1 11.25 5h1.5A4.75 4.75 0 0 0 8 .25v1.5Zm6.25 13.75c0 .53-.449 1.21-1.636 1.804-1.142.571-2.772.946-4.614.946v1.5c2.024 0 3.894-.409 5.285-1.104 1.347-.674 2.465-1.742 2.465-3.146h-1.5ZM8 18.25c-1.842 0-3.472-.375-4.614-.946C2.199 16.711 1.75 16.03 1.75 15.5H.25c0 1.404 1.118 2.473 2.465 3.146C4.106 19.34 5.975 19.75 8 19.75v-1.5ZM1.75 15.5c0-.53.449-1.21 1.636-1.804 1.142-.571 2.772-.946 4.614-.946v-1.5c-2.024 0-3.894.409-5.285 1.104C1.368 13.028.25 14.096.25 15.5h1.5ZM8 12.75c1.842 0 3.472.375 4.614.946 1.187.594 1.636 1.275 1.636 1.804h1.5c0-1.404-1.118-2.473-2.465-3.146-1.391-.695-3.26-1.104-5.285-1.104v1.5Z"
                                    />
                                </svg>
                            </span>
                            <span class="blog-card-value">${blog.author ?? 'User'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        blogContent.insertAdjacentHTML('beforeend', blogElement);
    });
}

export { initBlogs };
