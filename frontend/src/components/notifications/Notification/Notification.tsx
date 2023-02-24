import React, { FC } from 'react';

import s from './Notification.module.scss';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setIsReadInState } from '../../../redux/slices/notificationsSlice';
import { useReadNotificationMutation } from '../../../service/notificationsApiSlice';
import { INotification } from '../../../types/redux/notifications/INotification';
import { ButtonColors } from '../../../types/UI/Button.types';
import ButtonLink from '../../../ui/ButtonLink/ButtonLink';
import Card from '../../../ui/Card/Card';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import { getLocalDateFromString } from '../../../utils/getLocalDateFromString';
import SanitizeHTML from '../../SanitizeHtml/SanitizeHtml';
import ServerResponse from '../../server/ServerResponse/ServerResponse';

interface INotificationProps {
    notification: INotification;
}

const Notification: FC<INotificationProps> = ({ notification: { html, date, id, isRead } }) => {
    const localDate = getLocalDateFromString(date);
    const dispatch = useAppDispatch();

    const [readNotification, { error, isError, isSuccess, isLoading }] = useReadNotificationMutation();

    const onReadNotification = (): void => {
        doAsyncFunc(async () => {
            try {
                // await readNotification({ id }).unwrap();
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
                <div className={'flex justify-between items-center'}>
                    <SanitizeHTML html={html} />
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

export default Notification;