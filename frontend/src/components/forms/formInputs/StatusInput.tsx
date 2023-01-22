import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../inputs/FormInput/FormInput';

const StatusInput: FC<ICustomInputProps> = ({ control, ...props }) => {
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
