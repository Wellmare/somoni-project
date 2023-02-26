import { FormInput } from 'entities/inputs';
import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from './ICustomInputProps';

export const StatusInput: FC<ICustomInputProps> = ({ control, ...props }) => {
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
