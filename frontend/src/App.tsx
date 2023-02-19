import React, { FC, useEffect } from 'react';

import Router from './components/routing/Router';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { selectIsAuth } from './redux/slices/authSlice';
import { addNotification } from './redux/slices/notificationsSlice';
import { connectToNotifications } from './service/notifications';

const App: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);

    // useEffect(() => {
    //     if (isAuth) {
    //         const eventSource = connectToNotifications(
    //             (event) => {
    //                 console.log('connect to notifications');
    //             },
    //             (notification) => {
    //                 console.log(notification);
    //                 dispatch(addNotification(notification));
    //             },
    //             (event) => {
    //                 console.error('Connection error');
    //             },
    //         );
    //     }
    // }, []);

    return (
        <>
            <Router />
        </>
    );
};

export default App;
