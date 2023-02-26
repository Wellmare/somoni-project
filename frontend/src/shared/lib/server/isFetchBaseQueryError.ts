import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const isFetchBaseQueryError = (
    err: FetchBaseQueryError | SerializedError | undefined,
): err is FetchBaseQueryError => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return err?.status !== undefined;
};
