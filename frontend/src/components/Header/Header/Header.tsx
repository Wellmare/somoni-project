import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../../hooks/useAuth';
import { useLazyGetUserInfoQuery } from '../../../service/userApiSlice';
import { PathsToNavigate } from '../../../types/Paths';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import Button from '../../common/Button/Button';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
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
                <Button
                    color={ButtonColors.green}
                    size={ButtonSizes.md}
                    onClick={() => navigate(PathsToNavigate.LOGIN)}
                >
                    Login
                </Button>
            )}
            {isAuth && (
                <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                    {data != null && <HeaderProfile username={data.username} photo={data.photo} />}
                </ServerResponse>
            )}
        </header>
    );
};

export default Header;
