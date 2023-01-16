import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEditCommentMutation } from '../../../../service/commentsApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import Button from '../../../common/Button/Button';
import ServerResponse from '../../../common/ServerResponse/ServerResponse';
import Success from '../../../common/Success/Success';
import CommentContentInput from '../../formInputs/CommentContentInput';

interface EditCommentInputs {
    content: string;
}

interface IFormEditCommentProps {
    commentId: string;
    setIsEdit: (isEdit: boolean) => void;
}

const FormEditComment: FC<IFormEditCommentProps> = ({ commentId, setIsEdit }) => {
    const { control, handleSubmit, setValue } = useForm<EditCommentInputs>({ mode: 'onSubmit' });
    const [editComment, { data, error, isError, isLoading, isSuccess }] = useEditCommentMutation();

    const onSubmit: SubmitHandler<EditCommentInputs> = ({ content }) => {
        console.log(content);
        doAsyncFunc(async () => {
            await editComment({ content, commentId });
            setIsEdit(false);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames('w-full', 'pl-5')}>
            <CommentContentInput control={control} />

            <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'submit'}>
                Редактировать
            </Button>

            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <Success>Комментарий отредактирован</Success>
            </ServerResponse>
        </form>
    );
};

export default FormEditComment;
