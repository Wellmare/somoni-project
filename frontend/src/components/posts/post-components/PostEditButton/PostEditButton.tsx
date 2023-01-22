import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import editIcon from '../../../../assets/svg/edit.svg';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import s from '../PostButton/PostButton.module.scss';

interface IPostEditButtonProps {
    postId: string;
}

const PostEditButton: FC<IPostEditButtonProps> = ({ postId }) => {
    return (
        <Link to={pathsToNavigate.editPost(postId)}>
            <div className={s.button}>
                <img src={editIcon} alt='edit' />
            </div>
        </Link>
    );
};

export default PostEditButton;
