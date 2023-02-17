import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { ButtonColors, ButtonSizes } from '../../../types/UI/Button.types';
import Button from '../../../ui/Button/Button';
import { pathsToNavigate } from '../../../utils/pathsToNavigate';
import FormInput from '../inputs/FormInput/FormInput';

interface SearchFormInputs {
    tag: string;
}

const SearchByTagForm: FC = () => {
    const { control, handleSubmit } = useForm<SearchFormInputs>({ mode: 'onSubmit', defaultValues: { tag: '' } });
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SearchFormInputs> = ({ tag }) => {
        navigate(pathsToNavigate.tag(tag));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'flex'}>
            <Controller
                render={({ field, fieldState, formState }) => (
                    <FormInput
                        id={'tag'}
                        error={fieldState.error}
                        label={null}
                        placeholder={'тэг1'}
                        {...field}
                        inputClassName={'p-1 px-3'}
                    />
                )}
                control={control}
                name={'tag'}
                rules={{
                    // required: {
                    //     value: true,
                    //     message: 'Поле обязательно',
                    // },
                    validate: (value) => {
                        if (value !== undefined) {
                            if (value.toString().includes('#')) {
                                return 'Символ # не может быть использован в тэгах';
                            }
                        }
                    },
                }}
            />
            <Button color={ButtonColors.green} size={ButtonSizes.sm} className={'px-2 ml-2'}>
                Искать
            </Button>
        </form>
    );
};

export default SearchByTagForm;
