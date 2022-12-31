import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { url } from '../constants/api';

const emptyApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: url,
    }),
    endpoints: (build) => ({}),
});

export default emptyApi;
