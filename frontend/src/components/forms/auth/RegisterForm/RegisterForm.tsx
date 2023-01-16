import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useFilePicker } from 'use-file-picker';

import { useRegister } from '../../../../hooks/useRegister';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { composeFormData } from '../../../../utils/composeFormData';
import Button from '../../../common/Button/Button';
import { ErrorsFromData } from '../../../common/ErrorsFromData/ErrorsFromData';
import PhotoInput from '../../../common/PhotoInput/PhotoInput';

import s from '../../../common/PhotoInput/PhotoInput.module.scss';
import ServerResponse from '../../../common/ServerResponse/ServerResponse';
import Success from '../../../common/Success/Success';
import EmailInput from '../../formInputs/EmailInput';
import PasswordInput from '../../formInputs/PasswordInput';
import UsernameInput from '../../formInputs/UsernameInput';

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
                <UsernameInput control={control} />
                <PasswordInput control={control} />
                <PasswordInput control={control} label={'password2'} id={'password2'} />

                <EmailInput control={control} />

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
