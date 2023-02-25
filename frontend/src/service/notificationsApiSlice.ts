import { apiSlice } from './index';

import { apiEndpoints } from '../constants/apiEndpoints';
import { IDataToReadNotification } from '../types/redux/notifications/IDataTo';

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: () => ({
                url: apiEndpoints.getAllNotifications,
            }),
        }),
        getLastNotifications: builder.query({
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
