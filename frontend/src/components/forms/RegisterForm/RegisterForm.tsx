import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useRegister } from '../../../hooks/useRegister';
import { emailRegExp } from '../../../other/emailRegExp';
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
        const formData = composeFormData([
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
            {
                name: 'photo',
                value: plainFiles[0],
            },
        ]);
        registerUser(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    id={'username'}
                    error={errors.username}
                    register={() =>
                        registerInput('username', {
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                        })
                    }
                    label={'Ник'}
                />

                <FormInput
                    id={'password'}
                    error={errors.password}
                    register={() =>
                        registerInput('password', {
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            minLength: {
                                value: 8,
                                message: 'Минимальная длинна пароля 8 символов',
                            },
                        })
                    }
                    label={'Пароль'}
                />

                <FormInput
                    id={'password2'}
                    error={errors.password2}
                    register={() =>
                        registerInput('password2', {
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            minLength: {
                                value: 8,
                                message: 'Минимальная длинна пароля 8 символов',
                            },
                            validate: (value) => {
                                if (watch('password') !== value) {
                                    return 'Пароли не совпадают';
                                }
                            },
                        })
                    }
                    label={'Повтор пароля'}
                />
                <FormInput
                    id={'email'}
                    error={errors.email}
                    register={() =>
                        registerInput('email', {
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            pattern: {
                                value: emailRegExp,
                                message: 'Некорректный email',
                            },
                        })
                    }
                    label={'Email'}
                />

                <PhotoInput
                    // id={'avatar'}
                    // error={errors.avatar}
                    // register={() =>
                    //     registerInput('avatar', {
                    //         required: false,
                    //     })
                    // }
                    image={filesContent?.[0]?.content}
                    openFilePicker={openFilePicker}
                />
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
