import React, { FC } from 'react';

import s from './NotificationsMenu.module.scss';

import { ReactComponent as NotificationIcon } from '../../../assets/svg/notification.svg';
import { BadgeColor } from '../../../types/UI/Badge.types';
import Badge from '../../../ui/Badge/Badge';
import Icon from '../../../ui/Icon/Icon';
import Menu from '../../Menu/Menu';
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
                <Notifications />
            </div>
        </Menu>
    );
};

export default NotificationsMenu;
