import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError as TypeFetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import React, { FC, ReactNode, useEffect } from 'react';

import { FetchBaseQueryError } from 'shared/components/FetchBaseQueryError';
import { baseErrorsMessages } from 'shared/lib/server/baseErrorsMessages';
import { IMessageToStatusCode } from 'shared/types/IMessageToStatusCode';
import { Loader } from 'shared/ui/Loader';

interface IServerResponseProps {
    children: ReactNode;
    responseError: (TypeFetchBaseQueryError | SerializedError | undefined) | null;
    messages?: IMessageToStatusCode[];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    loader?: ReactNode;
    onSuccess?: () => void;
}

export const ServerResponse: FC<IServerResponseProps> = ({
    children,
    responseError,
    isError,
    messages,
    isSuccess,
    isLoading,
    loader,
    onSuccess,
}) => {
    const messagesErrors = messages !== undefined ? messages : [];

    const loaderOnLoading = loader !== undefined ? loader : <Loader />;

    useEffect(() => {
        if (isSuccess && onSuccess != null) {
            onSuccess();
        }
    }, [isSuccess]);

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
