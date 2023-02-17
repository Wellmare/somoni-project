import React, { FC, ReactNode, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { PathsToNavigate } from '../../../../constants/Paths';
import { logout as logoutState } from '../../../../redux/slices/authSlice';
import { useDeleteProfileMutation } from '../../../../service/userApiSlice';
import Alert from '../../../../ui/modals/Alert/Alert';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';

interface IDeleteProfileAlertProps {
    children: ReactNode;
}

const DeleteProfileAlert: FC<IDeleteProfileAlertProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleteProfile, { isError, error, isSuccess, data, isLoading }] = useDeleteProfileMutation();
    const navigate = useNavigate();

    const onDeleteProfile = (): void => {
        doAsyncFunc(async () => {
            try {
                await deleteProfile(undefined);
                await logoutState();
                navigate(PathsToNavigate.MAIN);
                document.location.reload();
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)}>{children}</div>
            <Alert
                title={'Удалить профиль?'}
                text={'ВЫ ПОТЕРЯЕТЕ ВСЕ ДАННЫЕ!'}
                isOpen={isOpen}
                onSuccess={() => {
                    onDeleteProfile();
                    setIsOpen(false);
                }}
                onClose={() => {
                    setIsOpen(false);
                }}
                buttonText={'Удалить профиль'}
            />
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <></>
            </ServerResponse>
        </>
    );
};

export default DeleteProfileAlert;
