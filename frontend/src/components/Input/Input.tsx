import React, { FC, useEffect } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
    id: string;
    error: FieldError | undefined;
    register: () => UseFormRegisterReturn;
    label: string;
}

const Input: FC<IInputProps> = ({ id, error, register, label, ...props }) => {
    useEffect(() => {
        console.log(error);
    }, [error]);
    return (
        <>
            <label style={{ display: 'block' }} htmlFor={id}>
                {label}
            </label>
            <input
                type='text'
                id={id}
                {...register()}
                {...props}
                style={{
                    display: 'block',
                    border: error?.message != null ? 'red 1px solid' : 'none',
                }}
            />
            {error?.message != null && <p style={{ color: 'red' }}>{error.message}</p>}
        </>
    );
};

export default Input;
