import classNames from 'classnames';
import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useRegister } from '../../../hooks/useRegister';
import { emailRegExp } from '../../../other/emailRegExp';
import { IFormDataItem } from '../../../types/IFormDataItem';
import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import { composeFormData } from '../../../utils/composeFormData';
import Button from '../../common/Button/Button';
import { ErrorsFromData } from '../../common/ErrorsFromData/ErrorsFromData';
import FormInput from '../../common/FormInput/FormInput';
import PhotoInput from '../../common/PhotoInput/PhotoInput';

import s from '../../common/PhotoInput/PhotoInput.module.scss';
import ServerResponse from '../../common/ServerResponse/ServerResponse';
import Success from '../../common/Success/Success';

interface RegisterPageInputs {
    avatar: string;
    username: string;
    password: string;
    password2: string;
    email: string;
}

const RegisterForm: FC = () => {
    const { handleSubmit, watch, control } = useForm<RegisterPageInputs>({
        mode: 'onChange',
    });

    const { error, registerUser, isSuccess, isError, isLoading } = useRegister();

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
            dataToForm.push({
                name: 'photo',
                value: plainFiles[0],
            });
        }
        const formData = composeFormData(dataToForm);

        registerUser(formData, {
            username: data.username,
            password: data.password,
        });
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

                <PhotoInput
                    image={filesContent?.[0]?.content}
                    openFilePicker={openFilePicker}
                    className={classNames(s.avatar)}
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
                            customFunc: (errorResponse) => <ErrorsFromData errorsData={errorResponse.data} />,
                        },
                    ]}
                >
                    <Success>Успешная регистрация!</Success>
                </ServerResponse>

                <Button color={ButtonColors.green} size={ButtonSizes.sm}>
                    Зарегистрироваться
                </Button>
            </form>
        </>
    );
};

export default RegisterForm;
