function handleError(error) {
    if (error.name === 'AbortError') return;

    console.log(error);
}

export default handleError;
