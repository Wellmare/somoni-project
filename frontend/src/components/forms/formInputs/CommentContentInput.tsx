import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormTextarea from '../inputs/FormTextarea/FormTextarea';

const CommentContentInput: FC<ICustomInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            control={control}
            name={'content'}
            render={({ fieldState, field, formState }) => (
                <FormTextarea
                    id={'content'}
                    error={fieldState.error}
                    label={null}
                    placeholder={'Написать комментарий'}
                    {...field}
                    {...props}
                />
            )}
            // rules={
            //     {
            //         // required: {
            //         //     value: true,
            //         //     message: 'Поле обязательно',
            //         // },
            //     }
            // }
        />
    );
};

export default CommentContentInput;
