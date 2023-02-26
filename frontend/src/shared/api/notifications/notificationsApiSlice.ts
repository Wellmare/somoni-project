import { apiEndpoints } from 'app/constants/apiEndpoints';
import { apiSlice } from 'shared/api/index';

import { IDataToReadNotification, INotification } from './types';

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query<INotification[], undefined>({
            query: () => ({
                url: apiEndpoints.getAllNotifications,
            }),
        }),
        getLastNotifications: builder.query<INotification[], undefined>({
            query: () => ({
                url: apiEndpoints.getLastNotifications,
            }),
        }),
        readNotification: builder.mutation<undefined, IDataToReadNotification>({
            query: ({ id }) => ({
                url: apiEndpoints.readNotification(id),
                method: 'POST',
            }),
        }),
        readAllNotifications: builder.mutation<undefined, undefined>({
            query: () => ({
                url: apiEndpoints.readAllNotification,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useLazyGetAllNotificationsQuery,
    useLazyGetLastNotificationsQuery,
    useGetLastNotificationsQuery,
    useReadAllNotificationsMutation,
    useReadNotificationMutation,
} = notificationsApiSlice;
