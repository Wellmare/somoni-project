import classNames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { preparePathToNavigate } from 'shared/lib/path';

import s from './PostTag.module.scss';

interface ITagProps {
    tag: string;
}

export const PostTag: FC<ITagProps> = ({ tag }) => {
    return (
        <Link to={preparePathToNavigate.tag(tag)}>
            <div className={classNames(s.tag)}>{tag}</div>
        </Link>
    );
};
