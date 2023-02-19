import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import s from './ProfileMenu.module.scss';

import { ReactComponent as ThreeDotsIcon } from '../../../../assets/svg/three-dots.svg';
import { PathsToNavigate } from '../../../../constants/Paths';
import { ButtonColors } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Icon from '../../../../ui/Icon/Icon';
import Menu, { MenuItem } from '../../../Menu/Menu';
import DeleteProfileAlert from '../DeleteProfileAlert/DeleteProfileAlert';

const ProfileMenu: FC = () => {
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

export default ProfileMenu;
