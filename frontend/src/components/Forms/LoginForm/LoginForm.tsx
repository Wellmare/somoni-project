import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useLogin } from '../../../hooks/useLogin';
import Error from '../Error/Error';
import FormInput from '../FormInput/FormInput';

interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({ mode: 'onBlur' });

    const { isLoading, loginUser, isError, error } = useLogin();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data): void => {
        console.log('login');
        loginUser({ username: data.username, password: data.password });
    };

    return (
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
                        maxLength: { value: 150, message: 'Длина пароля должна быть меньше 150 символов' },
                    })
                }
                label={'Password'}
            />

            <p>{isLoading && 'Загрузка...'}</p>
            <p>{error?.status === 401 && <Error>Неверный логин или пароль</Error>}</p>
            <p>{error?.status === 400 && <Error>Не хватает полей</Error>}</p>
            <p>{error?.status === 'FETCH_ERROR' && <Error>Не удалось получить ответ от сервера</Error>}</p>

            {/* {error} */}
            <button className={classNames('bg-cyan-700', 'py-1', 'px-4', 'rounded-md')} type='submit'>
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
