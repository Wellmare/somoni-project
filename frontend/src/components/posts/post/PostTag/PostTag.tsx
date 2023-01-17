import classNames from 'classnames';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './PostTag.module.scss';

import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

interface ITagProps {
    tag: string;
}

const PostTag: FC<ITagProps> = ({ tag }) => {
    const navigate = useNavigate();
    const onClickTag = (): void => {
        navigate(pathsToNavigate.tag(tag));
    };

    return (
        <div className={classNames(s.tag)} onClick={onClickTag}>
            {tag}
        </div>
    );
};

export default PostTag;
