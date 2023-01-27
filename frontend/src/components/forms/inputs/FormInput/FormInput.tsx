import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import s from './FormInput.module.scss';

import { InputType } from '../../../../types/UI/Input.types';
import Input from '../../../../ui/Input/Input';

export interface IInputProps {
    id: string;
    error: FieldError | undefined;
    label: string | null;
    placeholder: string;
    inputClassName?: string;
}

const FormInput: FC<IInputProps> = ({ id, error, label, placeholder, inputClassName, ...props }) => {
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        setIsError(error?.message !== undefined);
    }, [error]);

    return (
        <div>
            {label != null && (
                <label htmlFor={id} className={classNames('block')}>
                    {label}
                </label>
            )}
            <Input
                type={InputType.filled}
                placeholder={placeholder}
                id={id}
                isError={isError}
                className={inputClassName}
                {...props}
            />
            {isError && <p className={classNames(s.error)}>{error?.message}</p>}
        </div>
    );
};
export default FormInput;

// const FormInput: React.ForwardRefRenderFunction<HTMLButtonElement, IInputProps> = (
//     { id, error, register, label, placeholder, ...props },
//     ref,
// ) => {
//     const [isError, setIsError] = useState<boolean>(false);
//     useEffect(() => {
//         setIsError(error?.message !== undefined);
//     }, [error]);
//
//     return (
//         <div className={classNames('mb-3')}>
//             <label htmlFor={id} className={classNames('block')}>
//                 {label}
//             </label>
//             <Input type={InputType.filled} placeholder={placeholder} id={id} isError={isError} {...props} ref={ref} />
//             {isError && <p className={classNames(s.error)}>{error?.message}</p>}
//         </div>
//     );
// };
//
// export default React.forwardRef(FormInput);
