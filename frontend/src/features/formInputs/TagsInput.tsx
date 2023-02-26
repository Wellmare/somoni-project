import { FormInput } from 'entities/inputs';

import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { tagsRegExp } from 'shared/lib/regExp';

import { ICustomInputProps } from './ICustomInputProps';

export const TagsInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'tags'}
                    error={fieldState.error}
                    label={'Тэги (через пробел)'}
                    placeholder={'Tag tag tag...'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            name={'tags'}
            rules={{
                pattern: {
                    value: tagsRegExp,
                    message: 'Любые символы, кроме _ запрещены',
                },
            }}
        />
    );
};
