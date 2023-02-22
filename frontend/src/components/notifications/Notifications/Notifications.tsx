import React, { FC } from 'react';

import s from './Notifications.module.scss';

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { readAllNotificationsInState, selectNotifications } from '../../../redux/slices/notificationsSlice';
import { useReadAllNotificationsMutation } from '../../../service/notificationsApiSlice';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../../ui/Button/Button';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import Notification from '../Notification/Notification';

const Notifications: FC = () => {
    const notifications = useAppSelector(selectNotifications);
    const [readAllNotifications, { isError, error, isSuccess, isLoading }] = useReadAllNotificationsMutation();
    const dispatch = useAppDispatch();

    const onReadAllNotifications = (): void => {
        doAsyncFunc(async () => {
            try {
                // await readAllNotifications(undefined).unwrap();
                dispatch(readAllNotificationsInState(undefined));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <div>
            <h2 className={`text-center font-medium ${s.h2}`}>Уведомления: </h2>
            <div className={'flex justify-start mt-3'}>
                <Button color={ButtonColors.green} onClick={onReadAllNotifications} size={ButtonSizes.sm}>
                    Прочитать все
                </Button>
            </div>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {/*    */}
            </ServerResponse>
            {notifications.map((notification) => (
                <Notification notification={notification} key={notification.id} />
            ))}
        </div>
    );
};

export default Notifications;
