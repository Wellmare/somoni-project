import classNames from 'classnames';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import FormInput from '../../components/FormInput/FormInput';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { setAuthTokens } from '../../redux/slices/authSlice';
import { useLoginMutation } from '../../service/authApiSlice';
import { PathsToNavigate } from '../../types/Paths';
import { IDataToLogin } from '../../types/redux/auth/IDataTo';
import { doAsyncFunc } from '../../utils/doAsyncFunc';

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

    const [login, { error, isError, data, isLoading, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginPageInputs> = (data): void => {
        console.log('login');
        loginUser({ username: data.username, password: data.password });
    };

    const loginUser = ({ username, password }: IDataToLogin): void => {
        doAsyncFunc(async () => {
            try {
                const response = await login({ username, password }).unwrap();
                dispatch(setAuthTokens(response));
                navigate(PathsToNavigate.MAIN);
            } catch (e) {
                console.log(e);
            }
        });
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
            <p>{isError && 'Неверный логин или пароль'}</p>

            {/* {error} */}
            <button className={classNames('bg-cyan-700', 'py-1', 'px-4', 'rounded-md')} type='submit'>
                Submit
            </button>
        </form>
    );
};

export default LoginPage;
