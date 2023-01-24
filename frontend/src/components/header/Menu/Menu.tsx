import { Menu as ReactMenu, MenuItem as MenuItemInner, MenuItemProps } from '@szhsin/react-menu';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import s from './Menu.module.scss';

import '@szhsin/react-menu/dist/transitions/slide.css';
import { ReactComponent as ArrowDownIcon } from '../../../assets/svg/arrow-down.svg';
import { ThemeContext } from '../../../context/ThemeContext';
import { useLogout } from '../../../hooks/useLogout';
import { Theme } from '../../../types/Theme';
import { AvatarSize } from '../../../types/UI/Avatar.types';
import Avatar from '../../../ui/Avatar/Avatar';
import Icon from '../../../ui/Icon/Icon';
import { pathsToNavigate } from '../../../utils/pathsToNavigate';

const menuClassName = ({ state }: { state: string }): string =>
    state === 'opening' ? s.menuOpening : state === 'opening' ? s.menuClosing : s.menu;

const menuItemClassName = ({ hover, disabled }: { hover: boolean; disabled: boolean }): string =>
    disabled ? s.menuItemDisabled : hover ? s.menuItemHover : s.menuItem;

const MenuItem = (props?: MenuItemProps): JSX.Element => <MenuItemInner {...props} className={menuItemClassName} />;

interface IMenuProps {
    photo: string;
    id: string;
}

const Menu: FC<IMenuProps> = ({ photo, id }) => {
    const themeContext = useContext(ThemeContext);
    const onChangeTheme = (): void => {
        themeContext?.setTheme(themeContext?.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };
    const { logoutUser } = useLogout();

    const pathToProfile = pathsToNavigate.user(id);

    return (
        <ReactMenu
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
            transition
            menuClassName={menuClassName}
        >
            {/* Для пк */}
            <div className={classNames('hidden', 'sm:block')}>
                <Link to={pathToProfile}>
                    <MenuItem>Профиль</MenuItem>
                </Link>
                <div className={s.menuDivider} />
                <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>
                <div className={s.menuDivider} />
                <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem>
            </div>

            {/* Для мобилы */}
            <div className={classNames('block', 'sm:hidden')}>
                <Link to={pathToProfile}>
                    <MenuItem>Профиль</MenuItem>
                </Link>

                <div className={s.menuDivider} />
                <MenuItem onClick={onChangeTheme}>Сменить тему</MenuItem>
                <div className={s.menuDivider} />
                <MenuItem onClick={() => logoutUser()}>Выйти</MenuItem>
            </div>
        </ReactMenu>
    );
};

export default Menu;
