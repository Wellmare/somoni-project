import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import s from './FormTextarea.module.scss';

export interface IFormTextareaProps {
    id: string;
    error: FieldError | undefined;
    label: string | null;
    placeholder: string;
    inputClassName?: string;
    // htmlProps?: HTMLProps<HTMLInputElement>;
    [x: string]: any;
}

const FormTextarea: FC<IFormTextareaProps> = ({
    id,
    error,
    label,
    placeholder,
    inputClassName,
    // htmlProps,
    ...props
}) => {
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
                <textarea
                    // type={InputType.filled}
                    placeholder={placeholder}
                    id={id}
                    // rows={2}
                    // htmlProps={{ id, autoComplete: 'on', ...htmlProps }}
                    // isError={isError}
                    className={classNames(s.textarea, inputClassName)}
                    {...props}
                />
                {isError && <p className={classNames(s.error)}>{error?.message}</p>}
            </div>
        </div>
    );
};
export default FormTextarea;
