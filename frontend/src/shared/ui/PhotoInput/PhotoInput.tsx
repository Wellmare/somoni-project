import classNames from 'classnames';

import React, { FC } from 'react';
import { Avatar, AvatarSize } from 'shared/ui/Avatar';

import { PhotoInputType } from './index';

import s from './PhotoInput.module.scss';

interface IPhotoInputProps {
    image: string | null;
    openFilePicker: () => void;
    type: PhotoInputType;
    [x: string]: any;
}

export const PhotoInput: FC<IPhotoInputProps> = ({ openFilePicker, image, type, ...props }) => {
    if (type === PhotoInputType.circle) {
        return (
            <div className={classNames('mb-2')}>
                <Avatar size={AvatarSize.large}>
                    <div {...props} onClick={() => openFilePicker()} className={classNames('w-full', 'h-full')}>
                        {image !== null ? <img src={image} alt='photo input' /> : <div className={s.avatar}></div>}
                    </div>
                </Avatar>
            </div>
        );
    }

    return (
        <div className={classNames('mb-2')}>
            <div {...props} onClick={() => openFilePicker()} className={s.square}>
                {image !== null && <img src={image} alt='photo input' />}
            </div>
        </div>
    );
};
