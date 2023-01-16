import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { IPartialInputProps } from '../../../types/IPartialInputProps';
import FormInput from '../../common/FormInput/FormInput';

const CommentContentInput: FC<IPartialInputProps> = ({ control, ...props }) => {
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
