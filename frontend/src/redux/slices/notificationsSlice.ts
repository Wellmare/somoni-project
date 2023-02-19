import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INotification } from '../../types/redux/notifications/INotification';
import { INotificationsSlice } from '../../types/redux/notifications/INotificationsSlice';
import { RootState } from '../store';

const initialState: INotificationsSlice = {
    notifications: [],
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification[]>) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.push(action.payload);
        },
    },
});

export const notificationsSliceReducer = notificationsSlice.reducer;
export const { setNotifications, addNotification } = notificationsSlice.actions;
export const selectNotifications = (state: RootState): INotification[] => state.notifications.notifications;
