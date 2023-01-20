export const getLocalDateFromString = (date: string): string => {
    const parsedDate = new Date(date);

    const localeDate = parsedDate.toLocaleDateString();
    const time = `${parsedDate.getHours()}:${parsedDate.getMinutes()}`;

    return `${localeDate}: ${time}`;
};
