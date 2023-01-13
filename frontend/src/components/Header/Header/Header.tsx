import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { useLazyGetUserInfoQuery } from '../../../service/userApiSlice';
import { PathsToNavigate } from '../../../types/Paths';
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

    useEffect(() => {
        if (isAuth && userId != null) {
            doAsyncFunc(async () => {
                await getUserInfo({ userId });
            });
        }
    }, [isAuth]);

    return (
        <header className={classNames('p-5', 'flex', 'justify-between', 'bg-green-700', 'mb-3')}>
            <Link to={isAuth ? PathsToNavigate.MAIN : PathsToNavigate.WELCOME}>Logo somoni</Link>
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
                >
                    {data != null && <HeaderProfile username={data.username} photo={data.photo} />}
                </ServerResponse>
            )}
        </header>
    );
};

export default Header;
