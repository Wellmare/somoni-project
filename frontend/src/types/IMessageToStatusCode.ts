import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IMessageToStatusCode {
    statusCode: number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
    message: string;
    customFunc?: (errorResponse: FetchBaseQueryError) => JSX.Element | null;
}
