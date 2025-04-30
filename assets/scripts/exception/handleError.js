import { notify } from '../modules/notify.js';

function handleError(error) {
    if (error.name === 'AbortError') return;

    if (error.isOperational) {
        notify(error.message);
    } else {
        notify('Problem exist.');
        console.log(error);
    }
}

export default handleError;
