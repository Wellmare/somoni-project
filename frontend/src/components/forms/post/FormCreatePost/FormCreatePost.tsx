import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';

import s from './FormCreatePost.module.scss';

import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectUserId } from '../../../../redux/slices/authSlice';
import { useCreatePostMutation } from '../../../../service/postsApiSlice';
import { useGetUserInfoQuery } from '../../../../service/userApiSlice';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { ButtonColors } from '../../../../types/UI/Button.types';
import { IPhotoInputType } from '../../../../types/UI/IPhotoInputType';
import Button from '../../../../ui/Button/Button';
import Error from '../../../../ui/Error/Error';
import EmailConfirmModal from '../../../../ui/modals/EmailConfirmModal/EmailConfirmModal';
import PhotoInput from '../../../../ui/PhotoInput/PhotoInput';
import Success from '../../../../ui/Success/Success';
import { composeFormData } from '../../../../utils/composeFormData';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import TagsInput from '../../formInputs/TagsInput';
import TitleInput from '../../formInputs/TitleInput';
import FormInputDraft from '../../inputs/FormInputDraft/FormInputDraft';

export interface FormCreatePostInputs {
    title: string;
    content: string;
    tags: string;
}

const FormCreatePost: FC = () => {
    const { handleSubmit, control, setValue, watch } = useForm<FormCreatePostInputs>({
        mode: 'onBlur',
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
                navigate(pathsToNavigate.post(response.id.toString()));
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
                    type={IPhotoInputType.square}
                />

                <div className={'mb-3'}>
                    <FormInputDraft name={'content'} watch={watch} setValue={setValue} />
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

export default FormCreatePost;
