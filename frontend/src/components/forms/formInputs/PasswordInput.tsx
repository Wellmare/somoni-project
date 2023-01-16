import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { IPartialInputProps } from '../../../types/IPartialInputProps';
import FormInput from '../../common/FormInput/FormInput';

const PasswordInput: FC<IPartialInputProps> = ({ control, ...props }) => {
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
                />
            )}
            control={control}
            name={'password'}
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
