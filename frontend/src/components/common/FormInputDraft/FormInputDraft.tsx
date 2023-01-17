// /* eslint-disable */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { EditorState } from 'draft-js';
import React, { FC } from 'react';
import { SetFieldValue, UseFormWatch } from 'react-hook-form';

import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

import { FormCreatePostInputs } from '../../forms/post/FormCreatePost/FormCreatePost';

interface IFormInputDraftProps {
    name: string;
    setValue: SetFieldValue<FormCreatePostInputs>;
    watch: UseFormWatch<FormCreatePostInputs>;

    [x: string]: any;
}

const FormInputDraft: FC<IFormInputDraftProps> = ({ name, watch, setValue, ...props }) => {
    const onEditorStateChange = (editorState: EditorState): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setValue(name, editorState);
    };

    const editorContent = watch('content');

    return (
        <>
            <ReactQuill
                theme='snow'
                value={editorContent}
                onChange={onEditorStateChange}
                className={'editor-padding'}
            />
        </>
    );
};

export default FormInputDraft;
