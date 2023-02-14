// /* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { FC } from 'react';
import { FieldError, SetFieldValue, UseFormWatch } from 'react-hook-form';

import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import Error from '../../../../ui/Error/Error';
import { FormCreatePostInputs } from '../../post/FormCreatePost/FormCreatePost';

interface IFormInputDraftProps {
    name: string;
    setValue: SetFieldValue<FormCreatePostInputs>;
    watch: UseFormWatch<any>;
    className?: string;
    errorField: FieldError | undefined;
    onChange: (value: string) => void;

    [x: string]: any;
}

const FormInputDraft: FC<IFormInputDraftProps> = ({
    name,
    watch,
    setValue,
    className = '',
    errorField,
    onChange,
    ...props
}) => {
    const onEditorStateChange = (value: string): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

export default FormInputDraft;
