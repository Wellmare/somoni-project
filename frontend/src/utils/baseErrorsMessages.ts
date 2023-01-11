import { IMessageToStatusCode } from '../types/IMessageToStatusCode';

export const baseErrorsMessages: IMessageToStatusCode[] = [
    { statusCode: 'FETCH_ERROR', message: 'Не удалось получить ответ от сервера' },
];
