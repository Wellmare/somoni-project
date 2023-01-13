import classNames from 'classnames';
import React, { FC } from 'react';
import { Controller, DefaultValues, SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { emailRegExp } from '../../../other/emailRegExp';
import { useEditUserMutation } from '../../../service/userApiSlice';
import { IFormDataItem } from '../../../types/IFormDataItem';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import { composeFormData } from '../../../utils/composeFormData';
import { doAsyncFunc } from '../../../utils/doAsyncFunc';
import Button from '../../common/Button/Button';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import FormInput from '../FormInput/FormInput';
import PhotoInput from '../PhotoInput/PhotoInput';
import s from '../PhotoInput/PhotoInput.module.scss';
import Success from '../Success/Success';

interface EditProfileInputs {
    username: string;
    email: string;
    bio: string;
}

interface IEditProfileFormProps {
    defaultValues: DefaultValues<EditProfileInputs>;
}

const EditProfileForm: FC<IEditProfileFormProps> = ({ defaultValues }) => {
    const { handleSubmit, control } = useForm<EditProfileInputs>({
        mode: 'onChange',
        defaultValues,
    });

    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const [editProfile, { error, isError, isLoading, isSuccess }] = useEditUserMutation();

    const onSubmit: SubmitHandler<EditProfileInputs> = (data) => {
        const dataToForm: IFormDataItem[] = [
            {
                name: 'username',
                value: data.username,
            },
            {
                name: 'email',
                value: data.email,
            },
            {
                name: 'photo',
                value: plainFiles.length > 0 ? plainFiles[0] : '',
            },
        ];
        const formData = composeFormData(dataToForm);

        doAsyncFunc(async () => {
            await editProfile(formData);
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PhotoInput
                    image={filesContent?.[0]?.content}
                    openFilePicker={openFilePicker}
                    className={classNames(s.avatar)}
                />

                <Controller
                    render={({ field, fieldState, formState }) => (
                        <FormInput
                            id={'username'}
                            error={fieldState.error}
                            label={'Никнейм'}
                            placeholder={'username'}
                            {...field}
                        />
                    )}
                    control={control}
                    name={'username'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно',
                        },
                    }}
                />

                <Controller
                    name={'email'}
                    render={({ field, fieldState, formState }) => (
                        <FormInput
                            id={'email'}
                            error={fieldState.error}
                            label={'Email'}
                            placeholder={'example@example.com'}
                            {...field}
                        />
                    )}
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно',
                        },
                        pattern: {
                            value: emailRegExp,
                            message: 'Некоректный email',
                        },
                    }}
                />
                <Controller
                    render={({ field, fieldState, formState }) => (
                        <FormInput
                            id={'bio'}
                            error={fieldState.error}
                            label={'Статус'}
                            placeholder={'Кто я?'}
                            {...field}
                        />
                    )}
                    control={control}
                    name={'bio'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно',
                        },
                    }}
                />

                <ServerResponse
                    responseError={error}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    messages={[
                        {
                            statusCode: 401,
                            message: 'Неверные данные',
                        },
                        {
                            statusCode: 400,
                            message: 'Не хватает полей',
                        },
                    ]}
                >
                    <Success>Профиль изменен!</Success>
                </ServerResponse>
                <Button size={ButtonSizes.md} color={ButtonColors.green} type={'submit'}>
                    Изменить
                </Button>
            </form>
        </>
    );
};

export default EditProfileForm;