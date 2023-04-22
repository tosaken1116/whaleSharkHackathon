export const castQueryToArray = (query: string | string[]) => {
    if (typeof query == "string") {
        return [query];
    }
    return query;
};
export const formatDate = () => {
    const date = new Date();
    const formatObj = {
        yyyy: date.getFullYear(),
        MM: date.getMonth() + 1,
        dd: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        SSS: date.getMilliseconds(),
    };

    return Object.entries(formatObj).reduce((formattedDate, [key, value]) => {
        return formattedDate.replace(
            key,
            String(value).padStart(key.length, "0")
        );
    }, "yyyy/MM/dd HH:mm:ss.SSS");
};
