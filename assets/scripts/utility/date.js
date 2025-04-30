function formatDate(date, format = 'Y-M-D') {
    const d = new Date(date);

    let year = d.getFullYear();
    let month = String(d.getMonth() + 1).padStart(2, 0);
    let day = String(d.getDate()).padStart(2, 0);

    const result = format.replace('Y', year).replace('M', month).replace('D', day);

    return result;
}

function getLastDayOfMonth(year, month) {
    return formatDate(new Date(year, month, 0));
}

export { formatDate, getLastDayOfMonth };
