import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../../common/FormInput/FormInput';

const UsernameInput: FC<ICustomInputProps> = ({ control, ...props }) => {
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
            }}
        />
    );
};

export default UsernameInput;
