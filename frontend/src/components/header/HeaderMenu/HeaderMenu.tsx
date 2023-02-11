import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import s from './HeaderMenu.module.scss';

import '@szhsin/react-menu/dist/transitions/slide.css';
import { ReactComponent as ArrowDownIcon } from '../../../assets/svg/arrow-down.svg';
import { ReactComponent as DefaultProfile } from '../../../assets/svg/default-profile.svg';
import { PathsToNavigate } from '../../../constants/Paths';
import { ThemeContext } from '../../../context/ThemeContext';
import { useLogout } from '../../../hooks/useLogout';
import { Theme } from '../../../types/Theme';
import { AvatarSize } from '../../../types/UI/Avatar.types';
import Avatar from '../../../ui/Avatar/Avatar';
import Error from '../../../ui/Error/Error';
import Icon from '../../../ui/Icon/Icon';
import { pathsToNavigate } from '../../../utils/pathsToNavigate';
import Menu, { MenuItem } from '../../Menu/Menu';

interface IMenuProps {
    isAuth: boolean;
    photo?: string;
    id?: string;
}

const HeaderMenu: FC<IMenuProps> = ({ isAuth, photo, id }) => {
    const themeContext = useContext(ThemeContext);
    const onChangeTheme = (): void => {
        themeContext?.setTheme(themeContext?.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };

    if (!isAuth) {
        return (
            <Menu
                menuButton={
                    <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}>
                        <Avatar size={AvatarSize.small}>
                            {/* <img src={notAuthAvatar} alt='not authed avatar' /> */}
                            <DefaultProfile />
                        </Avatar>
                        <Icon customTypeClassName={s.arrowIcon}>
                            <ArrowDownIcon />
                        </Icon>
                    </div>
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

    const pathToProfile = pathsToNavigate.user(id);

    return (
        <Menu
            menuButton={
                <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}>
                    <Avatar size={AvatarSize.small}>
                        <img src={photo} alt='profile photo' />
                    </Avatar>
                    <Icon customTypeClassName={s.arrowIcon}>
                        <ArrowDownIcon />
                    </Icon>
                </div>
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

                <div className={s.menuDivider} />

                <Link to={PathsToNavigate.CREATE_POST}>
                    <MenuItem>Создать пост</MenuItem>
                </Link>

                <div className={s.menuDivider} />

                <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>

                <div className={s.menuDivider} />

                <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem>
            </div>
        </Menu>
    );
};

export default HeaderMenu;

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
