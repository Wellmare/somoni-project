import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useRegister } from '../../../hooks/useRegister';
import { emailRegExp } from '../../../other/emailRegExp';
import { IFormDataItem } from '../../../types/IFormDataItem';
import { composeFormData } from '../../../utils/composeFormData';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';
import PhotoInput from '../PhotoInput/PhotoInput';

interface RegisterPageInputs {
    avatar: string;
    username: string;
    password: string;
    password2: string;
    email: string;
}

const RegisterForm: FC = () => {
    const {
        register: registerInput,
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm<RegisterPageInputs>({
        mode: 'onChange',
    });

    const { error, registerUser, isLoading, isSuccess } = useRegister();

    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const onSubmit: SubmitHandler<RegisterPageInputs> = (data) => {
        const dataToForm: IFormDataItem[] = [
            {
                name: 'username',
                value: data.username,
            },
            {
                name: 'password',
                value: data.password,
            },
            {
                name: 'password2',
                value: data.password2,
            },
            {
                name: 'email',
                value: data.email,
            },
        ];
        if (plainFiles[0] !== undefined) {
            dataToForm.push({ name: 'photo', value: plainFiles[0] });
        }
        const formData = composeFormData(dataToForm);

        registerUser(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    render={({ field, fieldState, formState }) => (
                        <FormInput
                            id={'password'}
                            error={fieldState.error}
                            label={'Пароль'}
                            placeholder={'password'}
                            {...field}
                        />
                    )}
                    control={control}
                    name={'password'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно',
                        },
                        minLength: {
                            value: 8,
                            message: 'Минимальная длинна пароля 8 символов',
                        },
                    }}
                />
                <Controller
                    render={({ field, fieldState, formState }) => (
                        <FormInput
                            id={'password2'}
                            error={fieldState.error}
                            label={'Повтор пароля'}
                            placeholder={'password'}
                            {...field}
                        />
                    )}
                    name={'password2'}
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: 'Поле обязательно',
                        },
                        minLength: {
                            value: 8,
                            message: 'Минимальная длинна пароля 8 символов',
                        },
                        validate: (value) => {
                            if (value !== watch('password')) {
                                return 'Пароли не совпадают';
                            }
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

                <PhotoInput image={filesContent?.[0]?.content} openFilePicker={openFilePicker} />
                {error?.status === 401 && <Error>Неверные данные</Error>}
                {error?.status === 400 && <Error>Не хватает полей</Error>}
                {error?.status === 'FETCH_ERROR' && <Error>Не удалось получить ответ от сервера</Error>}

                {isSuccess && <p>Зарегистривано!</p>}

                <button type={'submit'}>send</button>
            </form>
        </>
    );
};

export default RegisterForm;
