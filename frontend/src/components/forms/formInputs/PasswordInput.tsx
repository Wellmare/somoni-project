import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../inputs/FormInput/FormInput';

const PasswordInput: FC<ICustomInputProps> = ({ control, name, ...props }) => {
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

export default PasswordInput;
