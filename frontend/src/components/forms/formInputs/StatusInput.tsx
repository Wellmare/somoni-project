import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { IPartialInputProps } from '../../../types/IPartialInputProps';
import FormInput from '../../common/FormInput/FormInput';

const StatusInput: FC<IPartialInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'bio'}
                    error={fieldState.error}
                    label={'Статус'}
                    placeholder={'Кто я?'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            name={'bio'}
        />
    );
};

export default StatusInput;
