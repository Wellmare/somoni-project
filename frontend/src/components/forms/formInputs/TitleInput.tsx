import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../../common/FormInput/FormInput';

const TitleInput: FC<ICustomInputProps> = ({ control, ...props }) => {
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

export default TitleInput;
