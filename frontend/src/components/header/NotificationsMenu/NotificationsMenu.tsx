import React, { FC } from 'react';

import s from './NotificationsMenu.module.scss';

import { ReactComponent as NotificationIcon } from '../../../assets/svg/notification.svg';
import { BadgeColor } from '../../../types/UI/Badge.types';
import Badge from '../../../ui/Badge/Badge';
import Icon from '../../../ui/Icon/Icon';
import Menu from '../../Menu/Menu';
import Notification from '../../notifications/Notification/Notification';
import Notifications from '../../notifications/Notifications/Notifications';

// interface INotificationMenuProps {}

const NotificationsMenu: FC /* <INotificationMenuProps> */ = () => {
    return (
        <Menu
            menuButton={
                <>
                    <div className={'cursor-pointer h-full flex items-center justify-center mr-3 relative'}>
                        <Icon customTypeClassName={s.icon}>
                            <NotificationIcon />
                        </Icon>
                        <Badge color={BadgeColor.red}>1</Badge>
                    </div>
                </>
            }
        >
            <div className={s.wrapper}>
                <h2>Уведомления: </h2>
                <Notification
                    notification={{ text: 'привет мир прпр', date: '2023-02-19T16:40:51.532181+03:00', link: 'lasd' }}
                />
                <Notification
                    notification={{ text: 'привет мир прпр', date: '2023-02-19T16:40:51.532181+03:00', link: 'lasd' }}
                />
                <Notification
                    notification={{ text: 'привет мир прпр', date: '2023-02-19T16:40:51.532181+03:00', link: 'lasd' }}
                />
                <Notifications />
            </div>
        </Menu>
    );
};

export default NotificationsMenu;
