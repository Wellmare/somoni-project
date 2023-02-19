import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import EditProfileForm from '../../components/forms/profile/EditProfileForm/EditProfileForm';
import DeleteProfileAlert from '../../components/profile/profile-components/DeleteProfileAlert/DeleteProfileAlert';
import ServerResponse from '../../components/server/ServerResponse/ServerResponse';
import { PathsToNavigate } from '../../constants/Paths';
import { useGetDataToEditUserQuery } from '../../service/userApiSlice';
import { ButtonColors, ButtonSizes } from '../../types/UI/Button.types';
import Button from '../../ui/Button/Button';

const EditProfilePage: FC = () => {
    const { data, error, isError, isLoading, isSuccess } = useGetDataToEditUserQuery(undefined);
    return (
        <>
            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                {data !== undefined && (
                    <EditProfileForm
                        defaultValues={{
                            bio: data.bio === null ? undefined : data.bio,
                            email: data.email,
                        }}
                        photo={data.photo}
                        id={data.id != null ? data.id : '1'}
                    />
                )}
                <div className={'flex justify-center items-center flex-col mt-6 mx-auto'} style={{ width: '400px' }}>
                    <Link to={PathsToNavigate.CHANGE_PASSWORD} className={'w-full mb-4'}>
                        <Button color={ButtonColors.blue} size={ButtonSizes.sm} className={'w-full'}>
                            Изменить пароль
                        </Button>
                    </Link>
                    <div className={'w-full'}>
                        <DeleteProfileAlert>
                            <Button color={ButtonColors.red} size={ButtonSizes.sm} className={'w-full'}>
                                Удалить профиль
                            </Button>
                        </DeleteProfileAlert>
                    </div>
                </div>
            </ServerResponse>
        </>
    );
};

export default EditProfilePage;
