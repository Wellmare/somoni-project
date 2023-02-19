import React, { FC } from 'react';

import { useAppSelector } from '../../../hooks/reduxHooks';
import { selectNotifications } from '../../../redux/slices/notificationsSlice';
import Notification from '../Notification/Notification';

const Notifications: FC = () => {
    const notifications = useAppSelector(selectNotifications);

    return (
        <div>
            {notifications.map((notification) => (
                <Notification notification={notification} key={notification.text} />
            ))}
        </div>
    );
};

export default Notifications;
