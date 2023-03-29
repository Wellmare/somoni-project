import { Router } from 'app/routing';
import React, { FC, useEffect } from 'react';
import './index.scss';
import { useLazyGetLastNotificationsQuery } from 'shared/api/notifications';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { selectIsAuth, selectUserId } from 'shared/store/slices/authSlice';
import { setNotifications } from 'shared/store/slices/notificationsSlice';

export const App: FC = () => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectIsAuth);
    const userId = useAppSelector(selectUserId);
    const [getLastNotifications] = useLazyGetLastNotificationsQuery();
    //
    // const [newNotifications, setNewNotifications] = useState<INotification[]>([]);
    //
    useEffect(() => {
        if (isAuth && userId != null) {
            try {
                doAsyncFunc(async () => {
                    try {
                        const notifications = await getLastNotifications(undefined).unwrap();
                        dispatch(setNotifications(notifications));
                    } catch (e) {
                        console.log(e);
                    }
                    // const eventSource = connectToNotifications(
                    //     userId,
                    //     (event) => {
                    //         console.log("connect to notifications");
                    //     },
                    //     (notification) => {
                    //         console.log(notification);
                    //         dispatch(addNotification(notification));
                    //         // setNewNotifications((notifications) => [...notifications, notification]);
                    //         // sendNotification(htmlToPlainText(notification.html), (event) => {
                    //         //     event.preventDefault(); // prevent the browser from focusing the Notification's tab
                    //         //     window.open(notification.mainLink, '_blank');
                    //         // });
                    //         setNewNotifications((notifications) => [notification, ...notifications]);
                    //         setTimeout(() => {
                    //             setNewNotifications((notifications) =>
                    //                 notifications.filter(({ id }) => id !== notification.id)
                    //             );
                    //         }, 5 * 60 * 1000);
                    //     },
                    //     (event) => {
                    //         console.error("Connection error");
                    //     }
                    // );
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, []);

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
