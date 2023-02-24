import React, { FC, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Router from './components/routing/Router';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { selectIsAuth, selectUserId } from './redux/slices/authSlice';
import { addNotification, setNotifications } from './redux/slices/notificationsSlice';
import { connectToNotifications } from './service/connectToNotifications';
import { useLazyGetLastNotificationsQuery } from './service/notificationsApiSlice';
import { doAsyncFunc } from './utils/doAsyncFunc';
import { htmlToPlainText } from './utils/htmlToPlainText';
import { sendNotification } from './utils/sendNotification';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const userId = useAppSelector(selectUserId);
    const [getLastNotifications] = useLazyGetLastNotificationsQuery();

    useEffect(() => {
        setTimeout(() => {
            sendNotification(htmlToPlainText('<a href="https://sa">Пользователь</a> прислал уведомление'), (event) => {
                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                window.open('https://somoni.org/post/2', '_blank');
            });
        }, 100);

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
                            sendNotification(htmlToPlainText(notification.html), (event) => {
                                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                                window.open(notification.mainLink, '_blank');
                            });
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
