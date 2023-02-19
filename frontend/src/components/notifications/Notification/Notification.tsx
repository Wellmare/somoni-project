import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { INotification } from '../../../types/redux/notifications/INotification';
import Card from '../../../ui/Card/Card';
import { getLocalDateFromString } from '../../../utils/getLocalDateFromString';

interface INotificationProps {
    notification: INotification;
}

const Notification: FC<INotificationProps> = ({ notification: { text, date, link } }) => {
    const localDate = getLocalDateFromString(date);
    return (
        <>
            <Link to={link}>
                <Card className={'px-2 py-1'}>
                    <div>{text}</div>
                    <div className={'flex justify-end'}>{localDate}</div>
                </Card>
            </Link>
        </>
    );
};

export default Notification;
