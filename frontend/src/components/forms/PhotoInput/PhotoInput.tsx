import classNames from 'classnames';
import React, { FC } from 'react';

import s from './PhotoInput.module.scss';

interface IPhotoInputProps {
    image: string | null;
    openFilePicker: () => void;
}

const PhotoInput: FC<IPhotoInputProps> = ({ openFilePicker, image }) => {
    return (
        <div className={classNames('mb-3')}>
            <div className={s.avatar} onClick={() => openFilePicker()}>
                {image !== null && <img src={image} alt='' className={s.img} />}
            </div>
        </div>
    );
};
export default PhotoInput;
