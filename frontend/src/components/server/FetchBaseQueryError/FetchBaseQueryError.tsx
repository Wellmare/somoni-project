import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError as TypeFetchBaseQueryError } from '@reduxjs/toolkit/query';
import React, { FC } from 'react';

import { IMessageToStatusCode } from '../../../types/IMessageToStatusCode';
import Error from '../../../ui/Error/Error';
import { isFetchBaseQueryError } from '../../../utils/isFetchBaseQueryError';

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

export default FetchBaseQueryError;
