import React, { FC } from 'react';

import { Controller } from 'react-hook-form';

import { ICustomInputProps } from '../../../types/ICustomInputProps';
import FormInput from '../inputs/FormInput/FormInput';

const TagsInput: FC<ICustomInputProps> = ({ control, ...props }) => {
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
                validate: (value) => {
                    const regexp = /#/;
                    if (regexp.test(value.toString())) {
                        return 'Символ # не может быть использован в тэгах';
                    }
                },
            }}
        />
    );
};

export default TagsInput;
