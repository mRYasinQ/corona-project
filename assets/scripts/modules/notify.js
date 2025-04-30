const notifyContainer = document.querySelector('.notify-container');

const successIcon = `
<span class="icon icon-medium icon-green icon-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8 14s1.125 1 3 1 3-1 3-1m2-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 2c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10ZM8 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        />
    </svg>
</span>`;

const errorIcon = `
<span class="icon icon-medium icon-red icon-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
        <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M14 15s-1.125-1-3-1-3 1-3 1m8-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM8 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm13 2c0 5.523-4.477 10-10 10S1 16.523 1 11 5.477 1 11 1s10 4.477 10 10Z"
        />
    </svg>
</span>`;

function notify(message, status = false) {
    const notifyElement = document.createElement('div');
    notifyElement.classList.add('notify');
    const spanElement = `<span class="notify-text">${message}</span>`;

    notifyElement.insertAdjacentHTML('beforeend', status ? successIcon : errorIcon);
    notifyElement.insertAdjacentHTML('beforeend', spanElement);

    const timerId = autoHide(notifyElement);
    notifyElement.addEventListener('click', () => hideNotify(notifyElement, timerId));

    notifyContainer.append(notifyElement);
}

function autoHide(notifyElement) {
    const timerId = setTimeout(() => {
        hideNotify(notifyElement);
    }, 4000);

    return timerId;
}

function hideNotify(notifyElement, timerId) {
    if (timerId) clearTimeout(timerId);

    notifyElement.classList.add('notify-hide');

    setTimeout(() => {
        notifyElement.remove();
    }, 900);
}

export { notify };
