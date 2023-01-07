import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import FormInput from '../../components/FormInput/FormInput';

export interface LoginPageInputs {
    username: string;
    password: string;
}

const LoginPage: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginPageInputs>({ mode: 'onBlur' });

    const onSubmit: SubmitHandler<LoginPageInputs> = (data): void => {
        console.log('submit');
        console.log(data.username);
        console.log(data.password);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    id={'username'}
                    error={errors.username}
                    register={() => register('username', { required: { value: true, message: 'Поле обязательно' } })}
                    label={'Username'}
                />
                <FormInput
                    id={'password'}
                    error={errors.password}
                    register={() =>
                        register('password', {
                            required: { value: true, message: 'Поле обязательно' },
                            maxLength: { value: 255, message: 'Длина пароля должна быть меньше 255 символов' },
                        })
                    }
                    label={'Password'}
                />
                <input style={{ display: 'block' }} type='submit' />
            </form>
        </>
    );
};

export default LoginPage;
