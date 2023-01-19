import classNames from 'classnames';
import React, { FC } from 'react';

import s from './PhotoInput.module.scss';

interface IPhotoInputProps {
    image: string | null;
    openFilePicker: () => void;
    [x: string]: any;
}

const PhotoInput: FC<IPhotoInputProps> = ({ openFilePicker, image, ...props }) => {
    return (
        <div className={classNames('mb-3')}>
            <div {...props} onClick={() => openFilePicker()} className={s.square}>
                {image !== null && <img src={image} alt='photo input' />}
            </div>
        </div>
    );
};
export default PhotoInput;
