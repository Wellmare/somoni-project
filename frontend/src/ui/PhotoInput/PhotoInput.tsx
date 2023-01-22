import classNames from 'classnames';
import React, { FC } from 'react';

import s from './PhotoInput.module.scss';

import { AvatarSize } from '../../types/UI/Avatar.types';
import { IPhotoInputType } from '../../types/UI/IPhotoInputType';
import Avatar from '../Avatar/Avatar';

interface IPhotoInputProps {
    image: string | null;
    openFilePicker: () => void;
    type: IPhotoInputType;
    [x: string]: any;
}

const PhotoInput: FC<IPhotoInputProps> = ({ openFilePicker, image, type, ...props }) => {
    if (type === IPhotoInputType.circle) {
        return (
            <div className={classNames('mb-3')}>
                <Avatar size={AvatarSize.large}>
                    <div {...props} onClick={() => openFilePicker()} className={classNames('w-full', 'h-full')}>
                        {image !== null ? <img src={image} alt='photo input' /> : <div className={s.avatar}></div>}
                    </div>
                </Avatar>
            </div>
        );
    }

    return (
        <div className={classNames('mb-3')}>
            <div {...props} onClick={() => openFilePicker()} className={s.square}>
                {image !== null && <img src={image} alt='photo input' />}
            </div>
        </div>
    );
};
export default PhotoInput;
