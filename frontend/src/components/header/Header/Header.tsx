import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';

import s from './Header.module.scss';

import { PathsToNavigate } from '../../../constants/Paths';
import { useAuth } from '../../../hooks/useAuth';
import { useLogout } from '../../../hooks/useLogout';
import { useLazyGetUserInfoQuery } from '../../../service/userApiSlice';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../../ui/Button/Button';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import SearchByTagForm from '../../forms/SearchByTagForm/SearchByTagForm';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import HeaderProfileSkeleton from '../../skeletons/HeaderProfileSkeleton';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import HeaderProfile from '../HeaderProfile/HeaderProfile';

const Header: FC = () => {
    const { isAuth, user, userId } = useAuth();
    const [getUserInfo, { isError, error, data, isSuccess, isLoading }] = useLazyGetUserInfoQuery();
    const { logoutUser } = useLogout();

    useEffect(() => {
        if (isAuth && userId != null) {
            doAsyncFunc(async () => {
                try {
                    await getUserInfo({ userId });
                } catch (e) {
                    console.log(e);
                }
            });
        }
    }, [isAuth]);

    return (
        <header className={classNames('p-5', 'flex', 'justify-between', 'mb-3', 'items-center', s.header)}>
            <Link to={isAuth ? PathsToNavigate.MAIN : PathsToNavigate.WELCOME}>Logo somoni</Link>

            {isAuth && (
                <div className={classNames('flex', 'justify-center', 'items-center')}>
                    <Link to={isAuth ? PathsToNavigate.CREATE_POST : PathsToNavigate.LOGIN}>Create post</Link>
                </div>
            )}

            <SearchByTagForm />

            {!isAuth && (
                <div className={classNames('flex', 'justify-between', 'items-center')}>
                    <Link to={PathsToNavigate.LOGIN} className={'mr-5'}>
                        <Button size={ButtonSizes.sm} color={ButtonColors.green} className={''}>
                            Вход
                        </Button>
                    </Link>
                    <HeaderMenu isAuth={false} />
                </div>
            )}
            {isAuth && (
                <ServerResponse
                    responseError={error}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    loader={<HeaderProfileSkeleton />}
                    messages={[
                        {
                            statusCode: 401,
                            message: 'Профиль не найден',
                            customFunc: (errorResponse) => {
                                logoutUser();
                                return null;
                            },
                        },
                        {
                            statusCode: 500,
                            message: 'Ошибка сервера!',
                            customFunc: (errorResponse) => {
                                console.log('500');
                                logoutUser();
                                return null;
                            },
                        },
                    ]}
                >
                    {data != null && <HeaderProfile username={data.username} photo={data.photo} id={data.id} />}
                </ServerResponse>
            )}
        </header>
    );
};

export default Header;
