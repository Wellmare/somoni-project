import React, { FC } from 'react';

import s from './Notification.module.scss';

import { INotification } from '../../../types/redux/notifications/INotification';
import Card from '../../../ui/Card/Card';
import { getLocalDateFromString } from '../../../utils/getLocalDateFromString';
import SanitizeHTML from '../../SanitizeHtml/SanitizeHtml';

interface INotificationProps {
    notification: INotification;
}

const Notification: FC<INotificationProps> = ({ notification: { html, date, id, isRead } }) => {
    const localDate = getLocalDateFromString(date);
    return (
        <>
            {/* <Link to={link}> */}
            <Card className={`px-2 py-1 ${s.notification}`}>
                <SanitizeHTML html={html} />
                <div className={'flex justify-end mt-1'}>{localDate}</div>
            </Card>
            {/* </Link> */}
        </>
    );
};

export default Notification;
