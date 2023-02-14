import classNames from 'classnames';
import React, { FC, HTMLProps, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import s from './FormInput.module.scss';

import { InputType } from '../../../../types/UI/Input.types';
import Error from '../../../../ui/Error/Error';
import Input from '../../../../ui/Input/Input';

export interface IInputProps {
    id: string;
    error: FieldError | undefined;
    label: string | null;
    placeholder: string;
    inputClassName?: string;
    htmlProps?: HTMLProps<HTMLInputElement>;
    [x: string]: any;
}

const FormInput: FC<IInputProps> = ({ id, error, label, placeholder, inputClassName, htmlProps, ...props }) => {
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        setIsError(error?.message !== undefined);
    }, [error]);

    return (
        <div className={'flex justify-center'}>
            <div className={s.container}>
                {label != null && (
                    <label htmlFor={id} className={classNames('block')}>
                        {label}
                    </label>
                )}
                <Input
                    type={InputType.filled}
                    placeholder={placeholder}
                    htmlProps={{ id, autoComplete: 'on', ...htmlProps }}
                    isError={isError}
                    className={inputClassName}
                    {...props}
                />
                {/* {isError && <p className={classNames(s.error)}>{error?.message}</p>} */}
                {isError && <Error>{error?.message}</Error>}
            </div>
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
