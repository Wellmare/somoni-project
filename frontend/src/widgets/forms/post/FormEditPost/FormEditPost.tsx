import { CREATE_POST_MAX_LENGTH } from 'app/constants';
import { FormInputDraft } from 'entities/inputs';
import { TagsInput, TitleInput } from 'features/formInputs';
import React, { FC } from 'react';

import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEditPostMutation } from 'shared/api/posts';
import { ErrorsFromData, ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { preparePathToNavigate } from 'shared/lib/path';
import { composeFormData } from 'shared/lib/server';
import { IFormDataItem, LinkType } from 'shared/types/server';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { PhotoInput, PhotoInputType } from 'shared/ui/PhotoInput';
import { Success } from 'shared/ui/Success';
import { useFilePicker } from 'use-file-picker';

import s from './FormEditPost.module.scss';

interface EditPostInputs {
    title: string;
    content: string;
    tags: string;
}

interface IFormEditPostProps {
    defaultValues: DefaultValues<EditPostInputs>;
    image: LinkType;
    postId: string;
}

export const FormEditPost: FC<IFormEditPostProps> = ({ defaultValues, image, postId }) => {
    const {
        handleSubmit,
        control,
        setValue,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<EditPostInputs>({
        mode: 'onChange',
        defaultValues,
    });
    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const [editPost, { isError, isLoading, isSuccess, error }] = useEditPostMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<EditPostInputs> = (data): void => {
        const formDataItems: IFormDataItem[] = [
            {
                name: 'title',
                value: data.title,
            },
            {
                name: 'content',
                value: data.content as unknown as string,
            },
            {
                name: 'image',
                value: plainFiles[0] !== undefined ? plainFiles[0] : '',
            },
        ];

        if (data.tags !== undefined && data.tags.trim() !== '') {
            formDataItems.push({
                name: 'tags',
                value: data.tags.trim(),
            });
        }

        const formData = composeFormData(formDataItems);

        doAsyncFunc(async () => {
            try {
                const response = await editPost({ formData, id: postId }).unwrap();
                navigate(preparePathToNavigate.post(response.id.toString()));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={'mb-3'}>
                <TitleInput control={control} />
            </div>

            <PhotoInput
                image={filesContent?.[0]?.content == null ? image : filesContent[0].content}
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
                <Success>Пост изменен</Success>
            </ServerResponse>
            <Button color={ButtonColors.green} size={ButtonSizes.md} className={'w-full'}>
                Изменить
            </Button>
        </form>
    );
};
