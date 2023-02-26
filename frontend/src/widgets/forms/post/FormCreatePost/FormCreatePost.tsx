import { CREATE_POST_MAX_LENGTH } from 'app/constants';
import { FormInputDraft } from 'entities/inputs';
import { TagsInput, TitleInput } from 'features/formInputs';
import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation } from 'shared/api/posts';
import { useGetUserInfoQuery } from 'shared/api/user/userApiSlice';
import { ErrorsFromData, ServerResponse } from 'shared/components';
import { useAppSelector } from 'shared/hooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { preparePathToNavigate } from 'shared/lib/path';
import { composeFormData } from 'shared/lib/server';
import { selectUserId } from 'shared/store/slices/authSlice';
import { IFormDataItem } from 'shared/types/server';
import { Button, ButtonColors } from 'shared/ui/Button';
import { Error } from 'shared/ui/Error';
import { PhotoInput, PhotoInputType } from 'shared/ui/PhotoInput';
import { Success } from 'shared/ui/Success';
import { useFilePicker } from 'use-file-picker';
import { EmailConfirmModal } from 'widgets/modals';

import s from './FormCreatePost.module.scss';

export interface FormCreatePostInputs {
    title: string;
    content: string;
    tags: string;
}

export const FormCreatePost: FC = () => {
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormCreatePostInputs>({
        mode: 'onChange',
        defaultValues: { content: '' },
    });
    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });
    const userId = useAppSelector(selectUserId);
    if (userId === null) return <Error>User id не найден!</Error>;
    const { data } = useGetUserInfoQuery({ userId });

    const [emailConfirmModalIsOpen, setEmailConfirmModalIsOpen] = useState(true);

    const [createPost, { isError, isLoading, isSuccess, error }] = useCreatePostMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormCreatePostInputs> = (data): void => {
        const formDataItems: IFormDataItem[] = [
            {
                name: 'title',
                value: data.title,
            },
            {
                name: 'content',
                value: data.content as unknown as string,
            },
        ];
        if (plainFiles[0] !== undefined) {
            formDataItems.push({
                name: 'image',
                value: plainFiles[0],
            });
        }
        if (data.tags !== undefined && data.tags.trim() !== '') {
            formDataItems.push({
                name: 'tags',
                value: data.tags.trim(),
            });
        }

        const formData = composeFormData(formDataItems);

        doAsyncFunc(async () => {
            try {
                const response = await createPost(formData).unwrap();
                navigate(preparePathToNavigate.post(response.id.toString()));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            {data?.isEmailConfirmed === false && (
                <EmailConfirmModal isOpen={emailConfirmModalIsOpen} setIsOpen={setEmailConfirmModalIsOpen} />
            )}
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={'mb-3'}>
                    <TitleInput control={control} />
                </div>
                <PhotoInput
                    image={filesContent?.[0] === undefined ? null : filesContent?.[0].content}
                    openFilePicker={openFilePicker}
                    type={PhotoInputType.square}
                />

                <div className={'mb-3'}>
                    <FormInputDraft
                        name={'content'}
                        watch={watch}
                        setValue={setValue}
                        onChange={(value) => {
                            if (value.length > CREATE_POST_MAX_LENGTH) {
                                setError('content', {
                                    message: `Текст превышает лимит в ${CREATE_POST_MAX_LENGTH} символов`,
                                });
                            } else {
                                clearErrors('content');
                            }
                        }}
                        errorField={errors.content}
                    />
                </div>

                <div className={'mb-3'}>
                    <TagsInput control={control} />
                </div>

                <ServerResponse
                    responseError={error}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    messages={[
                        {
                            statusCode: 400,
                            message: 'Не хватает полей',
                            customFunc: (errorResponse) => <ErrorsFromData errorsData={errorResponse.data} />,
                        },
                        {
                            statusCode: 401,
                            message: 'Вы не подтвердили почту!',
                        },
                    ]}
                >
                    <Success>Пост создан</Success>
                </ServerResponse>

                <Button
                    color={ButtonColors.green}
                    className={'w-full py-2.5'}
                    disabled={watch('content') === '<p><br></p>' || watch('content') === '' || watch('title') === ''}
                >
                    Создать
                </Button>
            </form>
        </>
    );
};
