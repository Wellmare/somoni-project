import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../inputs/FormInput/FormInput';

const CommentContentInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            control={control}
            name={'content'}
            render={({ fieldState, field, formState }) => (
                <FormInput
                    id={'content'}
                    error={fieldState.error}
                    label={'Комментарий'}
                    placeholder={'Вааау!'}
                    {...field}
                    {...props}
                />
            )}
            rules={{
                required: {
                    value: true,
                    message: 'Поле обязательно',
                },
            }}
        />
    );
};

export default CommentContentInput;
