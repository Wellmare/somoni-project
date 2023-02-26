import { PathsToNavigate } from 'app/constants/Paths';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetDataToEditUserQuery } from 'shared/api/user/userApiSlice';
import { ServerResponse } from 'shared/components';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { EditProfileForm } from 'widgets/forms';
import { DeleteProfileAlert } from 'widgets/profile/profile-components';

export const EditProfilePage: FC = () => {
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
                <div className={'flex justify-center items-center flex-col mt-6 mx-auto'} style={{ maxWidth: '400px' }}>
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
