import { FormInput } from 'entities/inputs';
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { ICustomInputProps } from './ICustomInputProps';

export const UsernameInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'username'}
                    error={fieldState.error}
                    label={'Никнейм'}
                    placeholder={'username'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            name={'username'}
            rules={{
                required: {
                    value: true,
                    message: 'Поле обязательно',
                },
                pattern: {
                    value: /^[A-Za-z0-9@.+_\u0400-\u04FF]+$/u,
                    message: 'Поле может содержать только буквы, цифры и знаки @ . + - _',
                },
            }}
        />
    );
};
