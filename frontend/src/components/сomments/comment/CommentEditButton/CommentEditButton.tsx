import classNames from 'classnames';
import React, { FC } from 'react';

interface ICommentEditButtonProps {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentEditButton: FC<ICommentEditButtonProps> = ({ setIsEdit }) => {
    return (
        <div className={classNames('cursor-pointer', 'ml-5')} onClick={() => setIsEdit((old) => !old)}>
            Edit
        </div>
    );
};

export default CommentEditButton;
