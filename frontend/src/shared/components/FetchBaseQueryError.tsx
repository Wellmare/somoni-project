import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError as TypeFetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { FC } from 'react';

import { isFetchBaseQueryError } from 'shared/lib/server/isFetchBaseQueryError';
import { IMessageToStatusCode } from 'shared/types/IMessageToStatusCode';
import { Error } from 'shared/ui/Error';

interface IFetchBaseQueryErrorProps {
    responseError: (TypeFetchBaseQueryError | SerializedError | undefined) | null;
    messages: IMessageToStatusCode[];
    isError?: boolean;
}

export const FetchBaseQueryError: FC<IFetchBaseQueryErrorProps> = ({ responseError, messages, isError }) => {
    if (responseError === null || isError === false) {
        return <></>;
    }

    if (isFetchBaseQueryError(responseError)) {
        let message = '';
        let resultComponent: null | JSX.Element = null;

        messages.forEach((messageToStatus) => {
            if (messageToStatus.statusCode === responseError.status) {
                message = messageToStatus.message;

                if (messageToStatus?.customFunc != null && messageToStatus.customFunc(responseError) !== null) {
                    resultComponent = messageToStatus.customFunc(responseError);
                }
            }
        });

        if (resultComponent !== null) {
            return resultComponent;
        }

        if (message !== '') {
            return <Error>{message}</Error>;
        }
    }

    return <Error>Что то пошло не так</Error>;
};
