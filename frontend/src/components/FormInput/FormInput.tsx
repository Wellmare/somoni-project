import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import s from './FormInput.module.scss';

interface IInputProps {
    id: string;
    error: FieldError | undefined;
    register: () => UseFormRegisterReturn;
    label: string;
}

const FormInput: FC<IInputProps> = ({ id, error, register, label, ...props }) => {
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        setIsError(error?.message !== undefined);
    }, [error]);

    return (
        <div className={classNames('mb-3')}>
            <label htmlFor={id} className={classNames('block')}>
                {label}
            </label>
            <input
                type='text'
                id={id}
                {...register()}
                {...props}
                className={classNames('py-1', 'px-3', 'mt-1', 'rounded-md', isError ? s.invalid : '')}
            />
            {isError && <p className={classNames(s.error)}>{error?.message}</p>}
        </div>
    );
};
export default FormInput;
