import classNames from 'classnames';
import React, { FC } from 'react';

import { HeaderMenu } from '../HeaderMenu/HeaderMenu';

interface IProfileProps {
    username: string;
    photo: string;
    id: string;
}

export const HeaderProfile: FC<IProfileProps> = ({ username, photo, id }) => {
    return (
        <div
            className={classNames('flex', 'items-end', 'justify-center', 'flex-col', 'md:items-center', 'sm:flex-row')}
        >
            <div className={'pr-2 hidden md:block sm:text-right'}>{username}</div>
            <HeaderMenu isAuth={true} photo={photo} id={id} />
        </div>
    );
};
