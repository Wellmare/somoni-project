import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { ReactComponent as EditIcon } from '../../../../assets/svg/edit.svg';
import { IconType } from '../../../../types/UI/IconType';
import Icon from '../../../../ui/Icon/Icon';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

interface IPostEditButtonProps {
    postId: string;
}

const PostEditButton: FC<IPostEditButtonProps> = ({ postId }) => {
    return (
        <Link to={pathsToNavigate.editPost(postId)}>
            <Icon type={IconType.primary}>
                <EditIcon />
            </Icon>
        </Link>
    );
};

export default PostEditButton;
