import classNames from 'classnames';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { PathsToNavigate } from '../../../constants/Paths';

interface ITagProps {
    tag: string;
}

const Tag: FC<ITagProps> = ({ tag }) => {
    const navigate = useNavigate();
    const onClickTag = (): void => {
        navigate(`${PathsToNavigate.TAG}/${tag}`);
    };

    return (
        <div className={classNames('p-5', 'cursor-pointer')} onClick={onClickTag}>
            {tag}
        </div>
    );
};

export default Tag;
