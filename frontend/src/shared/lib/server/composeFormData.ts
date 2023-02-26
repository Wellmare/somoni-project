import { IFormDataItem } from 'shared/types/server';

export const composeFormData = (items: IFormDataItem[]): FormData => {
    const formData = new FormData();
    items.forEach(({ value, name }) => {
        formData.append(name, value);
    });
    return formData;
};
