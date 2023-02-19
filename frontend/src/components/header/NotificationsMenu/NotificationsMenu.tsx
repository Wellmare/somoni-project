import React, { FC } from 'react';

import s from './NotificationsMenu.module.scss';

import { ReactComponent as NotificationIcon } from '../../../assets/svg/notification.svg';
import Icon from '../../../ui/Icon/Icon';
import Menu from '../../Menu/Menu';
import Notifications from '../../notifications/Notifications/Notifications';

// interface INotificationMenuProps {}

const NotificationsMenu: FC /* <INotificationMenuProps> */ = () => {
    return (
        <Menu
            menuButton={
                <>
                    <div className={'cursor-pointer h-full flex items-center justify-center mr-3'}>
                        <Icon customTypeClassName={s.icon}>
                            <NotificationIcon />
                        </Icon>
                    </div>
                </>
            }
        >
            <div className={s.wrapper}>
                <Notifications />
            </div>
        </Menu>
    );
};

export default NotificationsMenu;
