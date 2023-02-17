import classNames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import s from './PostTag.module.scss';

import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

interface ITagProps {
    tag: string;
}

const PostTag: FC<ITagProps> = ({ tag }) => {
    return (
        <Link to={pathsToNavigate.tag(tag)}>
            <div className={classNames(s.tag)}>{tag}</div>
        </Link>
    );
};

export default PostTag;
