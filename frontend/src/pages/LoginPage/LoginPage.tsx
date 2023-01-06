import React, { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../components/Input/Input';

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
            {/* <input type='submit' /> */}
            {/*     control={control} */}
            {/*     render={({ field, fieldState: { invalid, isTouched, isDirty, error } }) => ( */}
            {/*         <Input invalid={invalid} {...field} /> */}
            {/*     )} */}
            {/*     name={'ui'} */}
            {/*     rules={{ */}
            {/*         required: true, */}
            {/*         minLength: 5, */}
            {/*     }} */}
            {/* /> */}
            {/* <input type='text' {...register('username', { required: true })} /> */}
            {/* {errors.username?.type === 'required' && 'Required'} */}
            {/* <input type='text' {...register('password', { required: true, minLength: 6 })} /> */}
            {/* {errors.password?.type === 'minLength' && 'Min lenght 6 symbols'} */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id={'username'}
                    error={errors.username}
                    register={() => register('username', { required: { value: true, message: 'Поле обязательно' } })}
                    label={'Username'}
                />
                <Input
                    id={'password'}
                    error={errors.password}
                    register={() => register('password', { required: { value: true, message: 'Поле обязательно' } })}
                    label={'Password'}
                />
                <input style={{ display: 'block' }} type='submit' />
            </form>
        </>
    );
};

export default LoginPage;
