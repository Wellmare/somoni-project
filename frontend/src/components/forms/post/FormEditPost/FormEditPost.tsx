import classNames from 'classnames';
import React, { FC } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';

import { useEditPostMutation } from '../../../../service/postsApiSlice';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { LinkType } from '../../../../types/redux/LinkType';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { IPhotoInputType } from '../../../../types/UI/IPhotoInputType';
import Button from '../../../../ui/Button/Button';
import PhotoInput from '../../../../ui/PhotoInput/PhotoInput';
import s from '../../../../ui/PhotoInput/PhotoInput.module.scss';
import Success from '../../../../ui/Success/Success';
import { composeFormData } from '../../../../utils/composeFormData';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import TagsInput from '../../formInputs/TagsInput';
import TitleInput from '../../formInputs/TitleInput';
import FormInputDraft from '../../inputs/FormInputDraft/FormInputDraft';

interface EditPostInputs {
    title: string;
    content: string;
    tags: string;
}

interface IFormEditPostProps {
    defaultValues: DefaultValues<EditPostInputs>;
    image: LinkType;
    postId: string;
}

const FormEditPost: FC<IFormEditPostProps> = ({ defaultValues, image, postId }) => {
    const { handleSubmit, control, setValue, watch } = useForm<EditPostInputs>({
        mode: 'onBlur',
        defaultValues,
    });
    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const [editPost, { isError, isLoading, isSuccess, error }] = useEditPostMutation();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<EditPostInputs> = (data): void => {
        const formDataItems: IFormDataItem[] = [
            {
                name: 'title',
                value: data.title,
            },
            {
                name: 'content',
                value: data.content as unknown as string,
            },
            {
                name: 'image',
                value: plainFiles[0] !== undefined ? plainFiles[0] : '',
            },
        ];

        if (data.tags !== undefined && data.tags.trim() !== '') {
            formDataItems.push({
                name: 'tags',
                value: data.tags.trim(),
            });
        }

        const formData = composeFormData(formDataItems);

        doAsyncFunc(async () => {
            try {
                const response = await editPost({ formData, id: postId }).unwrap();
                navigate(pathsToNavigate.post(response.id.toString()));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'mb-3'}>
                <TitleInput control={control} />
            </div>

            <PhotoInput
                image={filesContent?.[0]?.content == null ? image : filesContent[0].content}
                openFilePicker={openFilePicker}
                className={classNames(s.image)}
                type={IPhotoInputType.square}
            />

            <div className={'mb-3'}>
                <FormInputDraft control={control} name={'content'} watch={watch} setValue={setValue} />
            </div>

            <div className={'mb-3'}>
                <TagsInput control={control} />
            </div>

            <ServerResponse responseError={error} isError={isError} isLoading={isLoading} isSuccess={isSuccess}>
                <Success>Пост изменен</Success>
            </ServerResponse>
            <Button color={ButtonColors.green} size={ButtonSizes.md}>
                Изменить
            </Button>
        </form>
    );
};

export default FormEditPost;
