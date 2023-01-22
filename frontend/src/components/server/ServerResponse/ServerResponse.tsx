import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError as TypeFetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import React, { FC, ReactNode } from 'react';

import { IMessageToStatusCode } from '../../../types/IMessageToStatusCode';
import Loader from '../../../ui/Loader/Loader';
import { baseErrorsMessages } from '../../../utils/baseErrorsMessages';
import FetchBaseQueryError from '../FetchBaseQueryError/FetchBaseQueryError';

interface IServerResponseProps {
    children: ReactNode;
    responseError: (TypeFetchBaseQueryError | SerializedError | undefined) | null;
    messages?: IMessageToStatusCode[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    loader?: ReactNode;
}

const ServerResponse: FC<IServerResponseProps> = ({
    children,
    responseError,
    isError,
    messages,
    isSuccess,
    isLoading,
    loader,
}) => {
    const messagesErrors = messages !== undefined ? messages : [];

    const loaderOnLoading = loader !== undefined ? loader : <Loader />;

    return (
        <>
            <FetchBaseQueryError
                responseError={responseError}
                messages={[...baseErrorsMessages, ...messagesErrors]}
                isError={isError}
            />
            {isLoading && loaderOnLoading}
            {isSuccess && <>{children}</>}
        </>
    );
};

export default ServerResponse;
