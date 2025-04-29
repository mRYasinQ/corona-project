const body = document.body;
const loadingElement = document.querySelector('.loading');

function setLoading(loadingStatus) {
    if (loadingStatus) {
        body.classList.add('overflow-hidden');
        loadingElement.classList.remove('loading-disable');
    } else {
        setTimeout(() => {
            body.classList.remove('overflow-hidden');
            loadingElement.classList.add('loading-disable');
        }, 1500);
    }
}

export { setLoading };
