import classNames from 'classnames';
import React, { FC } from 'react';

import Menu from '../Menu/Menu';

interface IProfileProps {
    username: string;
    photo: string;
    id: string;
}

const HeaderProfile: FC<IProfileProps> = ({ username, photo, id }) => {
    return (
        <div className={classNames('flex', 'items-center')}>
            <div className={'pr-2'}>{username}</div>
            <Menu photo={photo} id={id} />
        </div>
    );
};

export default HeaderProfile;
