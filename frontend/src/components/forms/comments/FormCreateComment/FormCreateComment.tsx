import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectUserId } from '../../../../redux/slices/authSlice';
import { useCreateCommentMutation } from '../../../../service/commentsApiSlice';
import { useGetUserInfoQuery } from '../../../../service/userApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Error from '../../../../ui/Error/Error';
import EmailConfirmModal from '../../../../ui/modals/EmailConfirmModal/EmailConfirmModal';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import FormInputDraft from '../../inputs/FormInputDraft/FormInputDraft';

interface CreatePostInputs {
    content: string;
}

interface IFormCreateCommentProps {
    postId: string;
}

const FormCreateComment: FC<IFormCreateCommentProps> = ({ postId }) => {
    const {
        handleSubmit,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<CreatePostInputs>({
        mode: 'onSubmit',
        defaultValues: { content: '' },
    });
    const [createComment, { data, error, isError, isLoading, isSuccess }] = useCreateCommentMutation();

    const onSubmit: SubmitHandler<CreatePostInputs> = ({ content }) => {
        doAsyncFunc(async () => {
            await createComment({ content, postId });
            setValue('content', '');
        });
    };

    const [emailConfirmModalIsOpen, setEmailConfirmModalIsOpen] = useState(false);
    const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);

    const userId = useAppSelector(selectUserId);
    if (userId === null) return <Error>User id не найден!</Error>;
    const { data: userInfoData } = useGetUserInfoQuery({ userId });

    const onFocus = (): void => {
        if (userInfoData?.isEmailConfirmed === false) {
            setEmailConfirmModalIsOpen(true);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <EmailConfirmModal
                required={false}
                isOpen={emailConfirmModalIsOpen}
                setIsOpen={(isOpen) => {
                    setEmailConfirmModalIsOpen(isOpen);
                    setIsFirstModalOpen(false);
                }}
            />

            {/* <CommentContentInput */}
            {/*    control={control} */}
            {/*    onFocus={isFirstModalOpen ? onFocus : null} */}
            {/*    disabled={userInfoData?.isEmailConfirmed === false && !isFirstModalOpen} */}
            {/* /> */}

            <FormInputDraft
                name={'content'}
                watch={watch}
                setValue={setValue}
                onFocus={isFirstModalOpen ? onFocus : null}
                disabled={userInfoData?.isEmailConfirmed === false && !isFirstModalOpen}
                className={'editor-comment'}
                formats={['bold', 'italic', 'link']}
                onChange={(value) => {
                    if (value.length > 500) {
                        setError('content', {
                            message: 'Текст превышает лимит в 500 символов',
                        });
                    } else {
                        clearErrors('content');
                    }
                }}
                errorField={errors.content}
            />

            <div className={'flex justify-end mt-3'}>
                <Button
                    color={ButtonColors.primary}
                    size={ButtonSizes.sm}
                    onClick={() => setValue('content', '')}
                    type={'button'}
                >
                    Отмена
                </Button>
                <Button
                    color={ButtonColors.green}
                    size={ButtonSizes.sm}
                    type={'submit'}
                    disabled={watch('content') === '' || watch('content') === '<p><br></p>'}
                >
                    Оставить комментарий
                </Button>
            </div>

            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                messages={[{ statusCode: 401, message: 'Вы не подтвердили почту!' }]}
            >
                {/* <Success>Комментарий создан</Success> */}
            </ServerResponse>
        </form>
    );
};

export default FormCreateComment;
