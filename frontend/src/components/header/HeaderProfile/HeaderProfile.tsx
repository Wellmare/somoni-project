import classNames from 'classnames';
import React, { FC } from 'react';

import HeaderMenu from '../HeaderMenu/HeaderMenu';

interface IProfileProps {
    username: string;
    photo: string;
    id: string;
}

const HeaderProfile: FC<IProfileProps> = ({ username, photo, id }) => {
    return (
        <div className={classNames('flex', 'items-center')}>
            <div className={'pr-2'}>{username}</div>
            <HeaderMenu photo={photo} id={id} />
        </div>
    );
};

export default HeaderProfile;
