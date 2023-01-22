import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useRegister } from '../../../../hooks/useRegister';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { IPhotoInputType } from '../../../../types/UI/IPhotoInputType';
import Button from '../../../../ui/Button/Button';
import PhotoInput from '../../../../ui/PhotoInput/PhotoInput';
import Success from '../../../../ui/Success/Success';
import { composeFormData } from '../../../../utils/composeFormData';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import EmailInput from '../../formInputs/EmailInput';
import PasswordInput from '../../formInputs/PasswordInput';
import UsernameInput from '../../formInputs/UsernameInput';
import FormInput from '../../inputs/FormInput/FormInput';

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
                <div className={'mb-3'}>
                    <UsernameInput control={control} />
                </div>
                <div className={'mb-3'}>
                    <PasswordInput control={control} />
                </div>
                <div className={'mb-3'}>
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
                        control={control}
                        name={'password2'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Поле обязательно',
                            },
                            validate: (value) => {
                                if (value !== watch('password')) {
                                    return 'Пароли не совпадают!';
                                }
                            },
                        }}
                    />
                </div>

                <div className={'mb-3'}>
                    <EmailInput control={control} />
                </div>

                <PhotoInput
                    image={filesContent?.[0] === undefined ? null : filesContent[0].content}
                    openFilePicker={openFilePicker}
                    type={IPhotoInputType.circle}
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
