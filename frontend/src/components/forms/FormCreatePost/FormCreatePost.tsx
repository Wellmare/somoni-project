import classNames from 'classnames';
import { EditorState } from 'draft-js';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useCreatePostMutation } from '../../../service/postsApiSlice';
import { IFormDataItem } from '../../../types/IFormDataItem';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import { composeFormData } from '../../../utils/composeFormData';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import Button from '../../common/Button/Button';
import Loader from '../../common/Loader/Loader';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import FormInputDraft from '../FormInputDraft/FormInputDraft';
import PhotoInput from '../PhotoInput/PhotoInput';
import s from '../PhotoInput/PhotoInput.module.scss';

export interface FormCreatePostInputs {
    title: string;
    content: EditorState;
    tags: string;
}

const FormCreatePost: FC = () => {
    const { handleSubmit, control, setValue, watch } = useForm<FormCreatePostInputs>({
        mode: 'onBlur',
        defaultValues: { content: EditorState.createEmpty() },
    });
    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const [createPost, { isError, isLoading, data, isSuccess }] = useCreatePostMutation();

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
            {
                name: 'tags',
                value: data.tags,
            },
        ];
        if (plainFiles[0] !== undefined) {
            formDataItems.push({
                name: 'image',
                value: plainFiles[0],
            });
        }
        const formData = composeFormData(formDataItems);

        doAsyncFunc(async () => {
            await createPost(formData);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                render={({ field, fieldState, formState }) => (
                    <FormInput
                        id={'title'}
                        error={fieldState.error}
                        label={'Заголовок'}
                        placeholder={'Title'}
                        {...field}
                    />
                )}
                control={control}
                name={'title'}
                rules={{
                    required: {
                        value: true,
                        message: 'Поле обязательно',
                    },
                }}
            />

            <PhotoInput
                image={filesContent?.[0]?.content}
                openFilePicker={openFilePicker}
                className={classNames(s.image)}
            />

            <FormInputDraft control={control} name={'content'} watch={watch} setValue={setValue} />

            <Controller
                render={({ field, fieldState, formState }) => (
                    <FormInput
                        id={'tags'}
                        error={fieldState.error}
                        label={'Тэги'}
                        placeholder={'Tag tag tag...'}
                        {...field}
                    />
                )}
                control={control}
                name={'tags'}
            />

            {isLoading && <Loader />}
            {isError && <Error>Что то пошло не так :(</Error>}
            {isSuccess && 'Пост создан'}
            {/* <p>{error?.status === 401 && <Error>Неверный логин или пароль</Error>}</p> */}
            {/* <p>{error?.status === 400 && <Error>Не хватает полей</Error>}</p> */}
            {/* <p>{error?.status === 'FETCH_ERROR' && <Error>Не удалось получить ответ от сервера</Error>}</p> */}

            {/* {error} */}
            <Button color={ButtonColors.green} size={ButtonSizes.md}>
                Создать
            </Button>
        </form>
    );
};

export default FormCreatePost;
