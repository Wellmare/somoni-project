import classNames from 'classnames';
import React, { FC } from 'react';

import s from './Input.module.scss';

import { InputType } from '../../types/UI/Input.types';

interface IInputProps {
    type: InputType;
    isError?: boolean;
    placeholder?: string;
    // id?: string;
    // width?: string;
    className?: string;
    [x: string]: unknown;
}

const Input: FC<IInputProps> = ({ type, placeholder, isError, className, ...props }) => {
    return (
        <input
            type='text'
            className={classNames(
                s.input,
                type === InputType.filled ? s.filled : s.outline,
                isError === true ? s.error : '',
                className,
            )}
            placeholder={placeholder}
            {...props}
        />
    );
};

export default Input;
