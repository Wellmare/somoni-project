import React, { FC } from 'react';

import { INotification } from '../../../types/redux/notifications/INotification';

interface INotificationProps {
    notification: INotification;
}

const Notification: FC<INotificationProps> = ({ notification }) => {
    return <div>{notification.text}</div>;
};

export default Notification;
