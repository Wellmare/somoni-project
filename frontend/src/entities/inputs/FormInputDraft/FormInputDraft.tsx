import React, { FC } from 'react';
import { FieldError, SetFieldValue, UseFormWatch } from 'react-hook-form';

import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import { Error } from 'shared/ui/Error';

interface IFormInputDraftProps {
    name: string;
    setValue: SetFieldValue<any>;
    watch: UseFormWatch<any>;
    className?: string;
    errorField: FieldError | undefined;
    onChange: (value: string) => void;

    [x: string]: any;
}

export const FormInputDraft: FC<IFormInputDraftProps> = ({
    name,
    watch,
    setValue,
    className = '',
    errorField,
    onChange,
    ...props
}) => {
    const onEditorStateChange = (value: string): void => {
        setValue(name, value);
        onChange(value);
    };

    const editorContent = watch('content');

    return (
        <>
            <ReactQuill
                theme='snow'
                value={editorContent}
                onChange={onEditorStateChange}
                className={`editor-padding ${className}`}
                {...props}
            />
            {errorField?.message != null && <Error>{errorField.message}</Error>}
        </>
    );
};