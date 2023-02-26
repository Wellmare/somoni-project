import { ThemeContext } from 'app/context/ThemeContext';
import { ReactComponent as DefaultProfile } from 'assets/svg/default-profile.svg';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import { Menu, MenuItem } from 'shared/components';
import { useLogout } from 'shared/hooks';
import { preparePathToNavigate } from 'shared/lib/path';
import { Theme } from 'shared/types/Theme';
import { Avatar } from 'shared/ui/Avatar';

import { AvatarSize } from 'shared/ui/Avatar/AvatarTypes';

import { Error } from 'shared/ui/Error';

import s from './HeaderMenu.module.scss';

import '@szhsin/react-menu/dist/transitions/slide.css';

interface IMenuProps {
    isAuth: boolean;
    photo?: string;
    id?: string;
}

export const HeaderMenu: FC<IMenuProps> = ({ isAuth, photo, id }) => {
    const themeContext = useContext(ThemeContext);
    const onChangeTheme = (): void => {
        themeContext?.setTheme(themeContext?.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };

    if (!isAuth) {
        return (
            <Menu
                menuButton={
                    <>
                        {/* <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}> */}
                        <div className={'cursor-pointer'}>
                            <Avatar size={AvatarSize.medium}>
                                <DefaultProfile />
                            </Avatar>
                        </div>
                        {/* <Icon customTypeClassName={s.arrowIcon}> */}
                        {/*    <ArrowDownIcon /> */}
                        {/* </Icon> */}
                        {/* </div> */}
                    </>
                }
            >
                {/* Для пк */}
                <div className={'on-desktop'}>
                    <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>
                </div>

                {/* Для мобилы */}
                <div className={classNames('on-mobile', s.menuOnMobile)}>
                    <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>
                </div>
            </Menu>
        );
    }
    if (id === undefined) {
        return <Error>Что то пошло не так!</Error>;
    }

    const { logoutUser } = useLogout();

    const pathToProfile = preparePathToNavigate.user(id);

    return (
        <Menu
            menuButton={
                <>
                    {/* <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}> */}
                    <div className={'cursor-pointer'}>
                        <Avatar size={AvatarSize.medium}>
                            <img src={photo} alt='profile photo' />
                        </Avatar>
                    </div>
                    {/* <Icon customTypeClassName={s.arrowIcon}> */}
                    {/*    <ArrowDownIcon /> */}
                    {/* </Icon> */}
                    {/* </div> */}
                </>
            }
        >
            {/* Для пк */}
            <div className={'on-desktop'}>
                <Link to={pathToProfile}>
                    <MenuItem>Профиль</MenuItem>
                </Link>
                <div className={s.menuDivider} />
                <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>
                <div className={s.menuDivider} />
                <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem>
            </div>

            {/* Для мобилы */}
            <div className={classNames('on-mobile', s.menuOnMobile)}>
                <Link to={pathToProfile}>
                    <MenuItem>Профиль</MenuItem>
                </Link>

                {/* <div className={s.menuDivider} /> */}

                {/* <Link to={PathsToNavigate.CREATE_POST}> */}
                {/*    <MenuItem>Создать пост</MenuItem> */}
                {/* </Link> */}

                <div className={s.menuDivider} />

                <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>

                <div className={s.menuDivider} />

                <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem>
            </div>
        </Menu>
    );
};

// /* // <ReactMenu
//         //     menuButton={
//         //         <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}>
//         //             <Avatar size={AvatarSize.small}>
//         //                 <img src={photo} alt='profile photo' />
//         //             </Avatar>
//         //             <Icon customTypeClassName={s.arrowIcon}>
//         //                 <ArrowDownIcon />
//         //             </Icon>
//         //         </div>
//         //     }
//         //     transition
//         //     menuClassName={menuClassName}
//         // >
//             {/* /!* Для пк *!/ */}
// {/* <div className={classNames('hidden', 'sm:block')}> */}
// {/*     <Link to={pathToProfile}> */}
// {/*         <MenuItem>Профиль</MenuItem> */}
// {/*     </Link> */}
// {/*     <div className={s.menuDivider} /> */}
// {/*     <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem> */}
// {/*     <div className={s.menuDivider} /> */}
// {/*     <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem> */}
// {/* </div> */}
//
// {/* /!* Для мобилы *!/ */}
// {/* <div className={classNames('block', 'sm:hidden')}> */}
// {/*     <Link to={pathToProfile}> */}
// {/*         <MenuItem>Профиль</MenuItem> */}
// {/*     </Link> */}
//
// {/*     <div className={s.menuDivider} /> */}
// {/*     <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem> */}
// {/*     <div className={s.menuDivider} /> */}
// {/*     <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem> */}
// {/* </div> */}
// // </ReactMenu> */
