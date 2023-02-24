import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INotification } from '../../types/redux/notifications/INotification';
import { INotificationsSlice } from '../../types/redux/notifications/INotificationsSlice';
import { RootState } from '../store';

const initialState: INotificationsSlice = {
    notifications: [
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:00',
        //     id: 'asd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> оставил комментарий под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:10',
        //     id: 'asdasdsdsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:00',
        //     id: 'asdasdsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> оставил комментарий под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:10',
        //     id: 'asdasdssdsdsddsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:00',
        //     id: 'asdd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> оставил комментарий под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:10',
        //     id: 'asdasdsddsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:00',
        //     id: 'asdasddsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
        // {
        //     html: '<a href="https://somoni.org/user/50">test_regru</a> оставил комментарий под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
        //     date: '2023-02-19T16:40:51.532181+03:10',
        //     id: 'asdasddssdsdsddsd',
        //     isRead: false,
        //     mainLink: 'https://somoni.org/post/2',
        // },
    ],
};

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification[]>) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.unshift(action.payload);
        },
        setIsReadInState: (state, { payload: { isRead, id } }: PayloadAction<{ id: string; isRead: boolean }>) => {
            state.notifications = state.notifications.map((notification) => {
                if (notification.id === id) {
                    return { ...notification, isRead };
                }
                return notification;
            });
        },
        readAllNotificationsInState: (state, action) => {
            state.notifications = state.notifications.map((notification) => {
                return { ...notification, isRead: true };
            });
        },
    },
});

export const notificationsSliceReducer = notificationsSlice.reducer;
export const { setNotifications, addNotification, setIsReadInState, readAllNotificationsInState } =
    notificationsSlice.actions;
export const selectNotifications = (state: RootState): INotification[] => state.notifications.notifications;
