import { ReactComponent as NotificationIcon } from 'assets/svg/notification.svg';
import React, { FC } from 'react';

import { Menu } from 'shared/components';
import { useAppSelector } from 'shared/hooks';
import { selectNotifications } from 'shared/store/slices/notificationsSlice';
import { Badge, BadgeColor } from 'shared/ui/Badge';
import { Icon } from 'shared/ui/Icon';
import s from 'widgets/header/NotificationsMenu/NotificationsMenu.module.scss';
import { Notifications } from 'widgets/notifications';

export const NotificationsMenu: FC /* <INotificationMenuProps> */ = () => {
    const notifications = useAppSelector(selectNotifications);
    const countUnReaded = notifications?.filter(({ isRead }) => !isRead).length;
    return (
        <Menu
            menuButton={
                <>
                    <div className={'cursor-pointer h-full flex items-center justify-center mr-3 relative'}>
                        <Icon customTypeClassName={s.icon}>
                            <NotificationIcon />
                        </Icon>
                        {countUnReaded !== 0 && countUnReaded != null && (
                            <Badge color={BadgeColor.red}>{countUnReaded}</Badge>
                        )}
                    </div>
                </>
            }
        >
            <div className={s.wrapper}>
                <Notifications />
                {/* <Notification */}
                {/*    notification={{ */}
                {/*        html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>', */}
                {/*        date: '2023-02-19T16:40:51.532181+03:00', */}
                {/*        id: 'asd', */}
                {/*        isRead: false, */}
                {/*    }} */}
                {/* /> */}
                {/* <Notification */}
                {/*    notification={{ */}
                {/*        html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>', */}
                {/*        date: '2023-02-19T16:40:51.532181+03:00', */}
                {/*        id: 'asd', */}
                {/*        isRead: false, */}
                {/*    }} */}
                {/* /> */}
                {/* <Notification */}
                {/*    notification={{ */}
                {/*        html: '<a href="https://somoni.org/user/50">test_regru</a> поставил лайк под пост <a href="https://somoni.org/post/12">Я купил наушники</a>', */}
                {/*        date: '2023-02-19T16:40:51.532181+03:00', */}
                {/*        id: 'asd', */}
                {/*        isRead: false, */}
                {/*    }} */}
                {/* /> */}
            </div>
        </Menu>
    );
};
