import { PathsToNavigate } from 'app/constants/Paths';
import React, { FC, ReactNode, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDeleteProfileMutation } from 'shared/api/user/userApiSlice';
import { ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { logout as logoutState } from 'shared/store/slices/authSlice';
import { Alert } from 'widgets/modals';

interface IDeleteProfileAlertProps {
    children: ReactNode;
}

export const DeleteProfileAlert: FC<IDeleteProfileAlertProps> = ({ children }) => {
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
