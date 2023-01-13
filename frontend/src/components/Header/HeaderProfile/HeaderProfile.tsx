import classNames from 'classnames';
import React, { FC } from 'react';

import { Link } from '../../../types/redux/Link';
import Menu from '../Menu/Menu';

interface IProfileProps {
    username: string;
    photo: Link;
}

const HeaderProfile: FC<IProfileProps> = ({ username, photo }) => {
    return (
        <div className={classNames('flex', 'items-center')}>
            <div className={'pr-2'}>{username}</div>
            <Menu photo={photo} />
        </div>
    );
};

export default HeaderProfile;
