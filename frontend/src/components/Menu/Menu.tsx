import { Menu as ReactMenu, MenuItem as MenuItemInner, MenuItemProps } from '@szhsin/react-menu';
import React, { FC, ReactNode } from 'react';

import s from '../header/HeaderMenu/HeaderMenu.module.scss';

const menuClassName = ({ state }: { state: string }): string =>
    state === 'opening' ? s.menuOpening : state === 'opening' ? s.menuClosing : s.menu;

const menuItemClassName = ({ hover, disabled }: { hover: boolean; disabled: boolean }): string =>
    disabled ? s.menuItemDisabled : hover ? s.menuItemHover : s.menuItem;

export const MenuItem = (props?: MenuItemProps): JSX.Element => (
    <MenuItemInner {...props} className={menuItemClassName} />
);

interface IMenuProps {
    menuButton: ReactNode;
    children: ReactNode;
}

const Menu: FC<IMenuProps> = ({ children, menuButton }) => {
    return (
        <ReactMenu menuButton={<div>{menuButton}</div>} transition menuClassName={menuClassName}>
            {children}
        </ReactMenu>
    );
};

export default Menu;
