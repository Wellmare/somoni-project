import { Menu as ReactMenu, MenuItem as MenuItemInner, MenuItemProps } from '@szhsin/react-menu';
import classNames from 'classnames';
import React, { FC, useContext } from 'react';

import { Link } from 'react-router-dom';

import s from './Menu.module.scss';

import '@szhsin/react-menu/dist/transitions/slide.css';

import { ThemeContext } from '../../../context/ThemeContext';
import { PathsToNavigate } from '../../../types/Paths';
import { Theme } from '../../../types/Theme';

const menuClassName = ({ state }: { state: string }): string =>
    state === 'opening' ? s.menuOpening : state === 'opening' ? s.menuClosing : s.menu;

const menuItemClassName = ({ hover, disabled }: { hover: boolean; disabled: boolean }): string =>
    disabled ? s.menuItemDisabled : hover ? s.menuItemHover : s.menuItem;

const MenuItem = (props?: MenuItemProps): JSX.Element => <MenuItemInner {...props} className={menuItemClassName} />;

const Menu: FC = () => {
    const themeContext = useContext(ThemeContext);
    const onChangeTheme = (): void => {
        themeContext?.setTheme(themeContext?.theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };

    return (
        <ReactMenu
            menuButton={
                <div className={classNames('px-3', 'py-2', 'bg-blue-400', 'cursor-pointer', 'rounded-xl')}>Test</div>
            }
            transition
            menuClassName={menuClassName}
        >
            <Link to={PathsToNavigate.PROFILE} className={classNames('block', 'sm:hidden')}>
                <MenuItem>Profile</MenuItem>
            </Link>
            <Link to={PathsToNavigate.PROFILE} className={classNames('hidden', 'sm:block')}>
                <MenuItem>Profile</MenuItem>
            </Link>
            <div className={s.menuDivider} />
            <MenuItem onClick={onChangeTheme}>Change theme</MenuItem>
        </ReactMenu>
    );
};

export default Menu;
