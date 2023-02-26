import { FormInput } from 'entities/inputs';
import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from './ICustomInputProps';

export const TitleInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'title'}
                    error={fieldState.error}
                    label={'Заголовок'}
                    placeholder={'Title'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            name={'title'}
            rules={{
                required: {
                    value: true,
                    message: 'Поле обязательно',
                },
            }}
        />
    );
};
