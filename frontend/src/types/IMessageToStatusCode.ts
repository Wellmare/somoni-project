export interface IMessageToStatusCode {
    statusCode: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
    message: string;
    customFunc?: () => void;
}
