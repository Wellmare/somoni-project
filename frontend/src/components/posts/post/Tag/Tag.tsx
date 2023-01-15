import classNames from 'classnames';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { pathsToNavigate } from '../../../../utils/pathsToNavigate';

interface ITagProps {
    tag: string;
}

const Tag: FC<ITagProps> = ({ tag }) => {
    const navigate = useNavigate();
    const onClickTag = (): void => {
        navigate(pathsToNavigate.tag(tag));
    };

    return (
        <div className={classNames('p-5', 'cursor-pointer')} onClick={onClickTag}>
            {tag}
        </div>
    );
};

export default Tag;
