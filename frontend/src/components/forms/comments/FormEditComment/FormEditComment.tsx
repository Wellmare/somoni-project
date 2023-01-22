import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useEditCommentMutation } from '../../../../service/commentsApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Success from '../../../../ui/Success/Success';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import CommentContentInput from '../../formInputs/CommentContentInput';

interface EditCommentInputs {
    content: string;
}

interface IFormEditCommentProps {
    content: string;
    commentId: string;
    setIsEdit: (isEdit: boolean) => void;
}

const FormEditComment: FC<IFormEditCommentProps> = ({ content, commentId, setIsEdit }) => {
    const { control, handleSubmit, setValue } = useForm<EditCommentInputs>({
        mode: 'onSubmit',
        defaultValues: { content },
    });
    const [editComment, { data, error, isError, isLoading, isSuccess }] = useEditCommentMutation();

    const onSubmit: SubmitHandler<EditCommentInputs> = ({ content }) => {
        doAsyncFunc(async () => {
            await editComment({ content, commentId });
            setIsEdit(false);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames('w-full', 'pl-5')}>
            <div className={classNames('flex', 'justify-between', 'items-end')}>
                <CommentContentInput control={control} />

                <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'submit'}>
                    Редактировать
                </Button>
            </div>

            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <Success>Комментарий отредактирован</Success>
            </ServerResponse>
        </form>
    );
};

export default FormEditComment;
