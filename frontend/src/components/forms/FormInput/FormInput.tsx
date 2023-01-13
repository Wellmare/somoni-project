import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import s from './FormInput.module.scss';

import { InputType } from '../../../types/UI/Input.types';
import Input from '../../common/Input/Input';

interface IInputProps {
    id: string;
    error: FieldError | undefined;
    register?: () => UseFormRegisterReturn;
    label: string;
    placeholder: string;
}

const FormInput: FC<IInputProps> = ({ id, error, register, label, placeholder, ...props }) => {
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        setIsError(error?.message !== undefined);
    }, [error]);

    return (
        <div className={classNames('mb-3')}>
            <label htmlFor={id} className={classNames('block')}>
                {label}
            </label>
            <Input type={InputType.filled} placeholder={placeholder} id={id} isError={isError} {...props} />
            {isError && <p className={classNames(s.error)}>{error?.message}</p>}
        </div>
    );
};
export default FormInput;