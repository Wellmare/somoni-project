import { FormInput } from 'entities/inputs';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { ICustomInputProps } from './ICustomInputProps';

export const PasswordInput: FC<ICustomInputProps> = ({ control, name, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'password'}
                    error={fieldState.error}
                    label={'Пароль'}
                    placeholder={'password'}
                    {...field}
                    {...props}
                    htmlProps={{ type: 'password' }}
                />
            )}
            control={control}
            name={name !== undefined ? name : 'password'}
            rules={{
                required: {
                    value: true,
                    message: 'Поле обязательно',
                },
            }}
        />
    );
};
