import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { IPartialInputProps } from '../../../types/IPartialInputProps';
import FormInput from '../../common/FormInput/FormInput';

const UsernameInput: FC<IPartialInputProps> = ({ control, ...props }) => {
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
