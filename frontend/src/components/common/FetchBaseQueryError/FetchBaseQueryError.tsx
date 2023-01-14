import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError as TypeFetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { FC } from 'react';

import { IMessageToStatusCode } from '../../../types/IMessageToStatusCode';
import { isFetchBaseQueryError } from '../../../utils/isFetchBaseQueryError';
import Error from '../../forms/Error/Error';

interface IFetchBaseQueryErrorProps {
    responseError: (TypeFetchBaseQueryError | SerializedError | undefined) | null;
    messages: IMessageToStatusCode[];
    isError?: boolean;
}

const FetchBaseQueryError: FC<IFetchBaseQueryErrorProps> = ({ responseError, messages, isError }) => {
    if (responseError === null || isError === false) {
        return <></>;
    }

    if (isFetchBaseQueryError(responseError)) {
        let message = '';
        messages.forEach((messageToStatus) => {
            if (messageToStatus.statusCode === responseError.status) {
                message = messageToStatus.message;
                if (messageToStatus.customFunc !== undefined) {
                    messageToStatus.customFunc();
                }
            }
        });

        if (message !== '') {
            return <Error>{message}</Error>;
        }
    }

    return <Error>Что то пошло не так</Error>;
};

export default FetchBaseQueryError;
