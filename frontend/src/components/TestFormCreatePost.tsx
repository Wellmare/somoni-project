import React, { ChangeEvent, FC, useState } from 'react';

import { useCreatePostMutation, useDeletePostMutation, useEditPostMutation } from '../service/postsApiSlice';
import { doAsyncFunc } from '../utils/doAsyncFunc';

const TestFormCreatePost: FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [createPost, { isLoading, data, error }] = useCreatePostMutation();
    const [editPost] = useEditPostMutation();
    const [deletePost] = useDeletePostMutation();

    const onSubmit = (e: React.MouseEvent): void => {
        if (selectedFile == null) return;
        e.preventDefault();
        // eslint-disable-next-line no-new
        console.log(selectedFile);
        const formData = new FormData();
        // console.log(inputRef.current?.files);
        // formData.append('test', inputRef.current?.files[0], 'test');
        formData.append('image', selectedFile);
        formData.append('title', 'test title');
        formData.append('content', 'test content');

        doAsyncFunc(async () => {
            try {
                const res = await createPost(formData).unwrap();
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        });
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e?.target?.files?.[0] != null) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onEdit = (e: React.MouseEvent): void => {
        if (selectedFile == null) return;
        e.preventDefault();
        // eslint-disable-next-line no-new
        const formData = new FormData();
        // console.log(inputRef.current?.files);
        // formData.append('test', inputRef.current?.files[0], 'test');
        formData.append('image', selectedFile);
        formData.append('title', 'test title');
        formData.append('content', 'test content');

        doAsyncFunc(async () => {
            try {
                const res = await editPost({ formData, id: 106 }).unwrap();
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        });
    };

    const onDelete = (e: React.MouseEvent): void => {
        e.preventDefault();
        doAsyncFunc(async () => {
            try {
                const res = await deletePost({ id: 106 }).unwrap();
                console.log(res);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <form>
            <input onChange={onChange} type='file' name={'test'} accept={'image/*'} />
            <button type='button' onClick={onSubmit}>
                SUBMIT
            </button>
            <button type='button' onClick={onEdit}>
                EDIT
            </button>
            <button type='button' onClick={onDelete}>
                DELETE
            </button>
        </form>
    );
};

export default TestFormCreatePost;
