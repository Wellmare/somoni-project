import { IMessageToStatusCode } from '../types/IMessageToStatusCode';

export const baseErrorsMessages: IMessageToStatusCode[] = [
    { statusCode: 'FETCH_ERROR', message: 'Не удалось получить ответ от сервера' },
    { statusCode: 500, message: 'Ошибка на сервере!' },
    { statusCode: 404, message: 'Не найдено!' },
    { statusCode: 401, message: 'Ошибка авторизации!' },
    { statusCode: 403, message: 'Ошибка доступа!' },
];
