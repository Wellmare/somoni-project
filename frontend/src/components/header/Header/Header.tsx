import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { PathsToNavigate } from '../../../constants/Paths';
import { useAuth } from '../../../hooks/useAuth';
import { useLogout } from '../../../hooks/useLogout';
import { useLazyGetUserInfoQuery } from '../../../service/userApiSlice';
import { ButtonColors } from '../../../types/UI/Button.types';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import ButtonLink from '../../common/ButtonLink/ButtonLink';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import HeaderProfileSkeleton from '../../skeletons/HeaderProfileSkeleton';
import HeaderProfile from '../HeaderProfile/HeaderProfile';

const Header: FC = () => {
    const { isAuth, user, userId } = useAuth();
    const navigate = useNavigate();
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
        <header className={classNames('p-5', 'flex', 'justify-between', 'bg-green-700', 'mb-3', 'items-center')}>
            <Link to={isAuth ? PathsToNavigate.MAIN : PathsToNavigate.WELCOME}>Logo somoni</Link>
            <div className={classNames('flex', 'justify-center', 'items-center')}>
                <Link to={isAuth ? PathsToNavigate.CREATE_POST : PathsToNavigate.LOGIN}>Create post</Link>
            </div>

            {!isAuth && (
                <ButtonLink
                    color={ButtonColors.green}
                    linkTo={PathsToNavigate.LOGIN}
                    onClick={() => navigate(PathsToNavigate.LOGIN)}
                >
                    Вход
                </ButtonLink>
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