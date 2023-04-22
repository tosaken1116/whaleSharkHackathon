export const castQueryToArray = (query: string | string[]) => {
    if (typeof query == "string") {
        return [query];
    }
    return query;
};
