import React, { FC, useEffect } from 'react';

import Router from './components/routing/Router';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { selectIsAuth, selectUserId } from './redux/slices/authSlice';
import { addNotification, setNotifications } from './redux/slices/notificationsSlice';
import { connectToNotifications } from './service/connectToNotifications';
import { useLazyGetLastNotificationsQuery } from './service/notificationsApiSlice';
import { doAsyncFunc } from './utils/doAsyncFunc';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const userId = useAppSelector(selectUserId);
    const [getLastNotifications] = useLazyGetLastNotificationsQuery();

    useEffect(() => {
        if (isAuth && userId != null) {
            try {
                doAsyncFunc(async () => {
                    const notifications = await getLastNotifications(undefined);
                    dispatch(setNotifications(notifications.data));
                    const eventSource = connectToNotifications(
                        userId,
                        (event) => {
                            console.log('connect to notifications');
                        },
                        (notification) => {
                            console.log(notification);
                            dispatch(addNotification(notification));
                        },
                        (event) => {
                            console.error('Connection error');
                        },
                    );
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

    return (
        <>
            <Router />
        </>
    );
};

export default App;
