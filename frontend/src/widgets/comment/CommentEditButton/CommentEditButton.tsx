import { ReactComponent as EditIcon } from 'assets/svg/edit.svg';
import classNames from 'classnames';
import React, { FC } from 'react';

import { Icon, IconType } from 'shared/ui/Icon';

interface ICommentEditButtonProps {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CommentEditButton: FC<ICommentEditButtonProps> = ({ setIsEdit }) => {
    return (
        <div className={classNames('cursor-pointer', 'mr-3')} onClick={() => setIsEdit((old) => !old)}>
            <div className={'icon'}>
                <Icon type={IconType.primary}>
                    <EditIcon />
                </Icon>
            </div>
        </div>
    );
};
