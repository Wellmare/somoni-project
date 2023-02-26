import { ReactComponent as EditIcon } from 'assets/svg/edit.svg';
import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';
import { Icon, IconType } from 'shared/ui/Icon';

interface IPostEditButtonProps {
    postId: string;
}

export const PostEditButton: FC<IPostEditButtonProps> = ({ postId }) => {
    return (
        <Link to={preparePathToNavigate.editPost(postId)}>
            <Icon type={IconType.primary}>
                <EditIcon />
            </Icon>
        </Link>
    );
};
