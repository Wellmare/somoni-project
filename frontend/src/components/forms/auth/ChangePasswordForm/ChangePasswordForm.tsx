import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import s from './ChangePasswordForm.module.scss';

import { PathsToNavigate } from '../../../../constants/Paths';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectTokens } from '../../../../redux/slices/authSlice';
import { useChangePasswordMutation } from '../../../../service/authApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Success from '../../../../ui/Success/Success';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import PasswordInput from '../../formInputs/PasswordInput';
import FormInput from '../../inputs/FormInput/FormInput';

interface ChangePasswordInputs {
    password: string;
    password2: string;
    oldPassword: string;
}

const ChangePasswordForm: FC = () => {
    const { handleSubmit, watch, control } = useForm<ChangePasswordInputs>({
        mode: 'onChange',
    });

    const [changePassword, { isSuccess, error, isError, isLoading }] = useChangePasswordMutation();
    const navigate = useNavigate();
    const refresh = useAppSelector(selectTokens)?.refresh;

    const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
        const { password2, password, oldPassword } = data;

        if (refresh == null) {
            console.log('Refresh token not found');
            return;
        }
        doAsyncFunc(async () => {
            try {
                await changePassword({ oldPassword, password, password2, refresh }).unwrap();
                navigate(PathsToNavigate.MAIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
                <div className={'mb-3'}>
                    <PasswordInput
                        control={control}
                        name={'oldPassword'}
                        label={'Старый пароль'}
                        placeholder={'old_password'}
                    />
                </div>
                <div className={'mb-3'}>
                    <PasswordInput control={control} name={'password'} label={'Новый пароль'} id={'new-password'} />
                </div>
                <div className={'mb-3'}>
                    <Controller
                        render={({ field, fieldState, formState }) => (
                            <FormInput
                                id={'new-password2'}
                                error={fieldState.error}
                                label={'Повтор пароля'}
                                placeholder={'password'}
                                {...field}
                                htmlProps={{ type: 'password' }}
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
                    <Success>Успешная смена пароля!</Success>
                </ServerResponse>

                <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'success'} className={'mt-3'}>
                    Изменить пароль
                </Button>
            </form>
        </>
    );
};

export default ChangePasswordForm;
