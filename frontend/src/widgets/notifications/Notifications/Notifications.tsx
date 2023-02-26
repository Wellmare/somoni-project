import React, { FC } from 'react';

import {
    useLazyGetAllNotificationsQuery,
    useReadAllNotificationsMutation,
} from 'shared/api/notifications/notificationsApiSlice';

import { ServerResponse } from 'shared/components';
import { useAppDispatch, useAppSelector } from 'shared/hooks/reduxHooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import {
    readAllNotificationsInState,
    selectNotifications,
    setNotifications,
} from 'shared/store/slices/notificationsSlice';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { ButtonLink } from 'shared/ui/ButtonLink';
import { Info } from 'shared/ui/Info';

import s from './Notifications.module.scss';

import { Notification } from '../Notification';

export const Notifications: FC = () => {
    const notifications = useAppSelector(selectNotifications);
    const [readAllNotifications, { isError, error, isSuccess, isLoading }] = useReadAllNotificationsMutation();
    const [getAllNotifications, allNotificationsResult] = useLazyGetAllNotificationsQuery();
    const dispatch = useAppDispatch();

    const onReadAllNotifications = (): void => {
        doAsyncFunc(async () => {
            try {
                await readAllNotifications(undefined).unwrap();
                dispatch(readAllNotificationsInState(undefined));
            } catch (e) {
                console.log(e);
            }
        });
    };

    const onShowAllNotifications = (): void => {
        doAsyncFunc(async () => {
            try {
                const notifications = await getAllNotifications(undefined).unwrap();
                dispatch(setNotifications(notifications));
            } catch (e) {
                console.log(e);
            }
        });
    };

    const isShowNotifications = notifications?.length > 0;

    return (
        <div>
            <h2 className={`text-center font-medium ${s.h2}`}>Уведомления: </h2>
            {isShowNotifications && (
                <>
                    <div className={'flex justify-start mt-3'}>
                        <Button color={ButtonColors.green} onClick={onReadAllNotifications} size={ButtonSizes.sm}>
                            Прочитать все
                        </Button>
                    </div>
                    <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                        {/*    */}
                    </ServerResponse>
                </>
            )}
            {isShowNotifications ? (
                <div className={'overflow-y-auto'} style={{ maxHeight: '90vh' }}>
                    {notifications?.map((notification) => (
                        <Notification notification={notification} key={notification.id} />
                    ))}
                    <div className={'mb-2'}>
                        <ButtonLink color={ButtonColors.green} onClick={onShowAllNotifications}>
                            Все уведомления
                        </ButtonLink>
                        <ServerResponse
                            responseError={allNotificationsResult.error}
                            isError={allNotificationsResult.isError}
                            isLoading={allNotificationsResult.isLoading}
                            isSuccess={allNotificationsResult.isSuccess}
                        >
                            {/*    */}
                        </ServerResponse>
                    </div>
                </div>
            ) : (
                <Info>Уведомлений нет</Info>
            )}
        </div>
    );
};
