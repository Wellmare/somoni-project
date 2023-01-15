import React, { FC } from 'react';

import s from './PostImage.module.scss';

import { LinkType } from '../../../../types/redux/LinkType';

interface IPostImageProps {
    image: LinkType;
}

const PostImage: FC<IPostImageProps> = ({ image }) => {
    if (image === null) {
        return <></>;
    }

    return (
        <div className={s.container}>
            <a href={image} target={'_blank'} rel='noreferrer'>
                <img src={image} alt='post image' className={s.image} />
            </a>
        </div>
    );
};

export default PostImage;
