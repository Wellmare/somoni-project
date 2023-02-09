import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { PathsToNavigate } from '../../../../constants/Paths';
import { useRestorePasswordConfirmMutation } from '../../../../service/authApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import Button from '../../../../ui/Button/Button';
import Success from '../../../../ui/Success/Success';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import PasswordInput from '../../formInputs/PasswordInput';
import FormInput from '../../inputs/FormInput/FormInput';

interface RestorePasswordConfirmInputs {
    password: string;
    password2: string;
}

interface IRestorePasswordConfirmFormProps {
    token: string;
}

const RestorePasswordConfirmForm: FC<IRestorePasswordConfirmFormProps> = ({ token }) => {
    console.log(token);
    const { handleSubmit, watch, control } = useForm<RestorePasswordConfirmInputs>({
        mode: 'onChange',
    });

    const [confirmRestorePassword, { isSuccess, error, isError, isLoading }] = useRestorePasswordConfirmMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RestorePasswordConfirmInputs> = (data) => {
        const { password2, password } = data;

        doAsyncFunc(async () => {
            try {
                await confirmRestorePassword({ password2, password, token }).unwrap();
                navigate(PathsToNavigate.LOGIN);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                            message: 'Неправильный токен!',
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

                <Button color={ButtonColors.green} size={ButtonSizes.sm} type={'success'}>
                    Изменить пароль
                </Button>
            </form>
        </>
    );
};

export default RestorePasswordConfirmForm;
