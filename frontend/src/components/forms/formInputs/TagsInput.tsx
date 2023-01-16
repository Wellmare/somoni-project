import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { IPartialInputProps } from '../../../types/IPartialInputProps';
import FormInput from '../../common/FormInput/FormInput';

const TagsInput: FC<IPartialInputProps> = ({ control, ...props }) => {
    return (
        <Controller
            render={({ field, fieldState, formState }) => (
                <FormInput
                    id={'tags'}
                    error={fieldState.error}
                    label={'Тэги'}
                    placeholder={'Tag tag tag...'}
                    {...field}
                    {...props}
                />
            )}
            control={control}
            name={'tags'}
        />
    );
};

export default TagsInput;
