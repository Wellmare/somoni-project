import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useCreateCommentMutation } from '../../../../service/commentsApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import Button from '../../../common/Button/Button';
import ServerResponse from '../../../common/ServerResponse/ServerResponse';
import Success from '../../../common/Success/Success';
import CommentContentInput from '../../formInputs/CommentContentInput';

interface CreatePostInputs {
    content: string;
}

interface IFormCreateCommentProps {
    postId: string;
}

const FormCreateComment: FC<IFormCreateCommentProps> = ({ postId }) => {
    const { control, handleSubmit, setValue } = useForm<CreatePostInputs>({
        mode: 'onSubmit',
    });
    const [createComment, { data, error, isError, isLoading, isSuccess }] = useCreateCommentMutation();

    const onSubmit: SubmitHandler<CreatePostInputs> = ({ content }) => {
        console.log(content);
        doAsyncFunc(async () => {
            await createComment({ content, postId });
            setValue('content', '');
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'mb-3'}>
                <CommentContentInput control={control} />
            </div>

            <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'submit'}>
                Создать
            </Button>

            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <Success>Комментарий создан</Success>
            </ServerResponse>
        </form>
    );
};

export default FormCreateComment;
