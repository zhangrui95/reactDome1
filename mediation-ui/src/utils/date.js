function formatDataUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

export function getDateTime(ms, type) {
    if (ms === null || ms === undefined) {
        return '';
    }
    const date = new Date(ms);
    const dateStr = date.getFullYear() + '-' +
        formatDataUnit(date.getMonth() + 1) + '-' +
        formatDataUnit(date.getDate());
    if (type === 'date') {
        return dateStr;
    }
    const timeStr = formatDataUnit(date.getHours()) + ':' +
        formatDataUnit(date.getMinutes()) + ':' +
        formatDataUnit(date.getSeconds());
    if (type === 'time') {
        return timeStr;
    }
    return dateStr + ' ' + timeStr;
}

export function getDate(ms, type) {
    if (ms === null || ms === undefined) {
        return '';
    }
    const date = new Date(ms);
    const dateStr = date.getFullYear() + '年' +
        formatDataUnit(date.getMonth() + 1) + '月' +
        formatDataUnit(date.getDate())+ '日';
    if (type === 'date') {
        return dateStr;
    }
    return dateStr;
}

export function getYear(ms) {
    if (ms === null || ms === undefined) {
        return '';
    }
    const date = new Date(ms);
    const year = date.getFullYear()
    return year;
}