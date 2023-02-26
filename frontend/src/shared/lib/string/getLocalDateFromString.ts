export const getLocalDateFromString = (date: string): string => {
    const parsedDate = new Date(date);

    const localeDate = parsedDate.toLocaleDateString();
    const hour = parsedDate.getHours();
    const minute = parsedDate.getMinutes() < 10 ? `0${parsedDate.getMinutes()}` : parsedDate.getMinutes();

    const time = `${hour}:${minute}`;

    return `${localeDate}: ${time}`;
};
