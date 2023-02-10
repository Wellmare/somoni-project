import classNames from 'classnames';
import React, { FC, HTMLProps } from 'react';

import s from './Input.module.scss';

import { InputType } from '../../types/UI/Input.types';

interface IInputProps {
    type: InputType;
    isError?: boolean;
    placeholder?: string;
    // id?: string;
    // width?: string;
    className?: string;
    htmlProps?: HTMLProps<HTMLInputElement>;
}

const Input: FC<IInputProps> = ({ type, placeholder, isError, className, htmlProps, ...props }) => {
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
            {...htmlProps}
        />
    );
};

export default Input;
