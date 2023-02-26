import { PathsToNavigate } from 'app/constants/Paths';
import { ReactComponent as ThreeDotsIcon } from 'assets/svg/three-dots.svg';
import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { Menu, MenuItem } from 'shared/components';
import { Button, ButtonColors } from 'shared/ui/Button';

import { Icon } from 'shared/ui/Icon';

import s from './ProfileMenu.module.scss';

import { DeleteProfileAlert } from '../index';

export const ProfileMenu: FC = () => {
    return (
        <Menu
            menuButton={
                <div className={classNames('cursor-pointer', 'flex', 'items-center', s.menuButton)}>
                    <Button color={ButtonColors.gray} className={'px-3 py-2'}>
                        <Icon customTypeClassName={s.threeDots}>
                            <ThreeDotsIcon />
                        </Icon>
                    </Button>
                </div>
            }
        >
            <div>
                <Link to={PathsToNavigate.EDIT_PROFILE}>
                    <MenuItem>Редактировать профиль</MenuItem>
                </Link>
                <Link to={PathsToNavigate.CHANGE_PASSWORD}>
                    <MenuItem>Изменить пароль</MenuItem>
                </Link>
                <DeleteProfileAlert>
                    <div className={s.deleteButton}>
                        <MenuItem>Удалить профиль</MenuItem>
                    </div>
                </DeleteProfileAlert>
            </div>
        </Menu>
    );
};
