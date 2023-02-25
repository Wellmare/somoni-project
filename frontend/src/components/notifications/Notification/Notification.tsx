import React, { FC } from 'react';

import s from './Notification.module.scss';

import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setIsReadInState } from '../../../redux/slices/notificationsSlice';
import { useReadNotificationMutation } from '../../../service/notificationsApiSlice';
import { INotification } from '../../../types/redux/notifications/INotification';
import { ButtonColors } from '../../../types/UI/Button.types';
import { LoaderSize } from '../../../types/UI/Loader.types';
import ButtonLink from '../../../ui/ButtonLink/ButtonLink';
import Card from '../../../ui/Card/Card';
import Loader from '../../../ui/Loader/Loader';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import { getLocalDateFromString } from '../../../utils/getLocalDateFromString';
import SanitizeHTML from '../../SanitizeHtml/SanitizeHtml';
import ServerResponse from '../../server/ServerResponse/ServerResponse';

interface INotificationProps {
    notification: INotification;
    withClose?: boolean;
    onClose?: () => void;
}

const Notification: FC<INotificationProps> = ({
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

export default Notification;
