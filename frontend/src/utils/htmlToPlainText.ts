export const htmlToPlainText = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
};
