import React, { FC } from 'react';

import { useReadNotificationMutation } from 'shared/api/notifications/notificationsApiSlice';
import { INotification } from 'shared/api/notifications/types/INotification';
import { SanitizeHtml, ServerResponse } from 'shared/components';
import { useAppDispatch } from 'shared/hooks/reduxHooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { getLocalDateFromString } from 'shared/lib/string/getLocalDateFromString';
import { setIsReadInState } from 'shared/store/slices/notificationsSlice';

import { ButtonColors } from 'shared/ui/Button';
import { ButtonLink } from 'shared/ui/ButtonLink';
import { Card } from 'shared/ui/Card';
import { Loader, LoaderSize } from 'shared/ui/Loader';

import s from './Notification.module.scss';

interface INotificationProps {
    notification: INotification;
    withClose?: boolean;
    onClose?: () => void;
}

export const Notification: FC<INotificationProps> = ({
    notification: { html, date, id, isRead },
    withClose = false,
    onClose,
}) => {
    const localDate = getLocalDateFromString(date);
    const dispatch = useAppDispatch();

    const [readNotification, { error, isError, isSuccess, isLoading }] = useReadNotificationMutation();

    const onReadNotification = (): void => {
        doAsyncFunc(async () => {
            try {
                await readNotification({ id }).unwrap();
                dispatch(setIsReadInState({ isRead: true, id }));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            {/* <Link to={link}> */}
            <Card className={`px-2 py-1 ${s.notification} ${isRead ? s.read : ''}`}>
                {withClose && (
                    <div className={'flex justify-end items-center cursor-pointer'} onClick={onClose}>
                        ✖
                    </div>
                )}
                <div className={'flex justify-between items-center'}>
                    <SanitizeHtml html={html} />
                    {!isRead && (
                        <div>
                            <ButtonLink color={ButtonColors.green} onClick={onReadNotification}>
                                Прочитать
                            </ButtonLink>
                            <ServerResponse
                                responseError={error}
                                isError={isError}
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                                loader={<Loader size={LoaderSize.sm} />}
                            >
                                {/*    */}
                            </ServerResponse>
                        </div>
                    )}
                </div>
                <div className={'flex justify-end mt-1'}>{localDate}</div>
            </Card>
            {/* </Link> */}
        </>
    );
};
