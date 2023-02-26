import { PathsToNavigate } from 'app/constants/Paths';
import classNames from 'classnames';
import { PasswordInput, UsernameInput } from 'features/formInputs';
import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ServerResponse } from 'shared/components';
import { useLogin } from 'shared/hooks/useLogin';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { ButtonLink } from 'shared/ui/ButtonLink';
import { Loader, LoaderSize } from 'shared/ui/Loader';
import { Success } from 'shared/ui/Success';

import s from './LoginForm.module.scss';

interface LoginFormInputs {
    username: string;
    password: string;
}

export const LoginForm: FC = () => {
    const { handleSubmit, control } = useForm<LoginFormInputs>({ mode: 'onBlur' });

    const { isLoading, loginUser, error, isError, isSuccess } = useLogin(true);

    const onSubmit: SubmitHandler<LoginFormInputs> = (data): void => {
        loginUser({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <div className={'mb-3'}>
                <UsernameInput control={control} />
            </div>
            <div className={'mb-3'}>
                <PasswordInput control={control} />
            </div>
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                loader={<Loader size={LoaderSize.sm} />}
                messages={[
                    {
                        message: 'Неверный логин или пароль',
                        statusCode: 401,
                    },
                    {
                        message: 'Не хватает полей',
                        statusCode: 400,
                    },
                ]}
            >
                <Success>Успешный вход!</Success>
            </ServerResponse>

            {/* {error} */}
            <div className={classNames('flex', 'items-center', 'justify-between', 'flex-col', 'sm:flex-row')}>
                <Button color={ButtonColors.green} size={ButtonSizes.sm} type='submit' className={'w-full sm:w-max'}>
                    Войти
                </Button>
                <div className={'mt-2 sm:mt-0'}>
                    <ButtonLink color={ButtonColors.blue} linkTo={PathsToNavigate.REGISTER}>
                        Еще не зарегистрирован?
                    </ButtonLink>
                </div>
            </div>
            <div className={'mt-5 text-right'}>
                <ButtonLink color={ButtonColors.green} linkTo={PathsToNavigate.RESTORE_PASSWORD}>
                    Забыли пароль?
                </ButtonLink>
            </div>
        </form>
    );
};
