import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { emailRegExp } from '../../../other/emailRegExp';
import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../inputs/FormInput/FormInput';

const EmailInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            name={'email'}
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'email'}
                    error={fieldState.error}
                    label={'Email'}
                    placeholder={'example@example.com'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            rules={{
                required: {
                    value: true,
                    message: 'Поле обязательно',
                },
                pattern: {
                    value: emailRegExp,
                    message: 'Некоректный email',
                },
            }}
        />
    );
};

export default EmailInput;
