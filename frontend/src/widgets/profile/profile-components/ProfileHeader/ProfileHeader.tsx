import { PathsToNavigate } from 'app/constants/Paths';
import { ProfileContext } from 'app/context';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from 'shared/hooks';
import { selectIsAuth } from 'shared/store/slices/authSlice';

import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';

import s from './ProfileHeader.module.scss';

import { ProfileAvatar, ProfileBio, ProfileFollowButton, ProfileStats } from '../index';
export const ProfileHeader: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { username, isMyProfile } = profile;
    const isAuth = useAppSelector(selectIsAuth);

    return (
        <>
            {/* <div className={classNames('flex', 'justify-between', 'items-start')}> */}
            {/*    <div className={classNames('flex', 'justify-start', 'items-start', 'flex-col', 'sm:flex-row')}> */}
            {/*        <ProfileAvatar /> */}
            {/*        <div className={'ml-4'}> */}
            {/*            <h2 className={`${s.username}`}>{username}</h2> */}
            {/*            <ProfileBio /> */}
            {/*            <div className={'flex items-start mt-3 flex-col md:flex-row md:items-center'}> */}
            {/*                <div> */}
            {/*                    <p>Подписчиков: {countFollowers}</p> */}
            {/*                    <p>Подписок: {countFollowing}</p> */}
            {/*                </div> */}
            {/*                /!* <div> *!/ */}
            {/*                <Button color={ButtonColors.green} size={ButtonSizes.sm} className={'ml-0 md:ml-3'}> */}
            {/*                    Подписаться */}
            {/*                </Button> */}
            {/*                /!* </div> *!/ */}
            {/*            </div> */}
            {/*        </div> */}
            {/*    </div> */}
            {/*    <div className={'mt-5'}>{isMyProfile && <ProfileMenu />}</div> */}
            {/* </div> */}
            <div className={'flex flex-col items-center'}>
                <ProfileAvatar />
                <h2 className={`${s.username}`}>{username}</h2>
                <ProfileBio />
                <ProfileStats />
                <div className={'flex justify-center items-center'}>
                    {!isMyProfile && isAuth && <ProfileFollowButton />}
                    {isMyProfile && (
                        <>
                            <Link to={PathsToNavigate.EDIT_PROFILE}>
                                <Button color={ButtonColors.green} size={ButtonSizes.sm}>
                                    Изменить профиль
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
