// import s from 'old_src/App.module.scss';
// import Notification from 'old_src/components/notifications/Notification/Notification';
// import Router from 'old_src/components/routing/Router';
// import { useAppDispatch, useAppSelector } from 'old_src/hooks/reduxHooks';
// import { selectIsAuth, selectUserId } from 'old_src/redux/slices/authSlice';
// import { addNotification, setNotifications } from 'old_src/redux/slices/notificationsSlice';
// import { connectToNotifications } from 'old_src/service/connectToNotifications';
// import { useLazyGetLastNotificationsQuery } from 'old_src/service/notificationsApiSlice';
// import { INotification } from 'old_src/types/redux/notifications/INotification';
import { Router } from 'app/routing';
import React, { FC, useEffect, useState } from 'react';
import './index.scss';
// import { doAsyncFunc } from 'utils';

import s from './app.module.scss';

export const App: FC = () => {
    // const dispatch = useAppDispatch();
    // const isAuth = useAppSelector(selectIsAuth);
    // const userId = useAppSelector(selectUserId);
    // const [getLastNotifications] = useLazyGetLastNotificationsQuery();
    //
    // const [newNotifications, setNewNotifications] = useState<INotification[]>([]);
    //
    // useEffect(() => {
    //     // setInterval(() => {
    //     //     // sendNotification(htmlToPlainText('<a href="https://sa">Пользователь</a> прислал уведомление'), (event) => {
    //     //     //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
    //     //     //     window.open('https://somoni.org/post/2', '_blank');
    //     //     // });
    //     //     const not: INotification = {
    //     //         id: '56',
    //     //         isRead: false,
    //     //         html: '<a href="https://somoni.org/user/50">test_regru</a> оставил комментарий под пост <a href="https://somoni.org/post/12">Я купил наушники</a>',
    //     //         date: '2022',
    //     //     };
    //     //     setNewNotifications((notifications) => [not, ...notifications]);
    //     //     setTimeout(() => {
    //     //         setNewNotifications((notifications) => notifications.filter(({ id }) => id !== not.id));
    //     //     }, 5 * 60 * 1000);
    //     // }, 2000);
    //
    //     if (isAuth && userId != null) {
    //         try {
    //             doAsyncFunc(async () => {
    //                 const notifications = await getLastNotifications(undefined);
    //                 dispatch(setNotifications(notifications.data));
    //                 const eventSource = connectToNotifications(
    //                     userId,
    //                     (event) => {
    //                         console.log('connect to notifications');
    //                     },
    //                     (notification) => {
    //                         console.log(notification);
    //                         dispatch(addNotification(notification));
    //                         // setNewNotifications((notifications) => [...notifications, notification]);
    //                         // sendNotification(htmlToPlainText(notification.html), (event) => {
    //                         //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
    //                         //     window.open(notification.mainLink, '_blank');
    //                         // });
    //                         setNewNotifications((notifications) => [notification, ...notifications]);
    //                         setTimeout(() => {
    //                             setNewNotifications((notifications) =>
    //                                 notifications.filter(({ id }) => id !== notification.id),
    //                             );
    //                         }, 5 * 60 * 1000);
    //                     },
    //                     (event) => {
    //                         console.error('Connection error');
    //                     },
    //                 );
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    // }, []);

    return (
        <>
            <Router />
            {/* {isAuth && ( */}
            {/*    <div className={s.notifications}> */}
            {/*        {newNotifications?.map((notification, index) => ( */}
            {/*            <Notification */}
            {/*                notification={notification} */}
            {/*                key={notification.id} */}
            {/*                withClose={true} */}
            {/*                onClose={() => */}
            {/*                    setNewNotifications((notifications) => */}
            {/*                        notifications.filter(({ id }) => id !== notification.id), */}
            {/*                    ) */}
            {/*                } */}
            {/*            /> */}
            {/*        ))} */}
            {/*    </div> */}
            {/* )} */}
        </>
    );
};
