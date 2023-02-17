import classNames from 'classnames';
import React, { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';

import s from './Header.module.scss';

import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg';
import { PathsToNavigate } from '../../../constants/Paths';
import { useAuth } from '../../../hooks/useAuth';
import { useLazyGetUserInfoQuery } from '../../../service/userApiSlice';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../../ui/Button/Button';
import Icon from '../../../ui/Icon/Icon';
import Logo from '../../../ui/Logo/Logo';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import SearchByTagForm from '../../forms/SearchByTagForm/SearchByTagForm';
import ServerResponse from '../../server/ServerResponse/ServerResponse';
import HeaderProfileSkeleton from '../../skeletons/HeaderProfileSkeleton';
import HeaderMenu from '../HeaderMenu/HeaderMenu';
import HeaderProfile from '../HeaderProfile/HeaderProfile';

const Header: FC = () => {
    const { isAuth, userId } = useAuth();
    const [getUserInfo, { isError, error, data, isSuccess, isLoading }] = useLazyGetUserInfoQuery();

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
        <header
            className={classNames(
                'p-2',
                'sm:p-3',
                'md:p-4',
                'lg:p-5',
                'flex',
                'justify-between',
                'mb-3',
                'items-center',
                s.header,
            )}
        >
            <Link to={isAuth ? PathsToNavigate.MAIN : PathsToNavigate.WELCOME}>
                <Logo />
            </Link>

            <div className='on-desktop'>
                <SearchByTagForm />
            </div>

            <div className={'flex'}>
                {isAuth && (
                    <div className={classNames('flex', 'justify-center', 'items-center')}>
                        <Link to={isAuth ? PathsToNavigate.CREATE_POST : PathsToNavigate.LOGIN}>
                            <Button color={ButtonColors.green} size={ButtonSizes.sm} className={'hidden md:block mr-6'}>
                                <span>Создать</span>
                            </Button>

                            <Button color={ButtonColors.green} className={'block sm:block md:hidden px-3 py-2 mr-4'}>
                                <Icon customTypeClassName={s.plusIcon}>
                                    <PlusIcon />
                                </Icon>
                            </Button>
                        </Link>
                    </div>
                )}

                {!isAuth && (
                    <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <Link to={PathsToNavigate.LOGIN} className={'mr-3'}>
                            <Button color={ButtonColors.green} className={'py-2.5 px-3'}>
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
                            },
                        ]}
                    >
                        {data != null && <HeaderProfile username={data.username} photo={data.photo} id={data.id} />}
                    </ServerResponse>
                )}
            </div>
        </header>
    );
};

export default Header;
