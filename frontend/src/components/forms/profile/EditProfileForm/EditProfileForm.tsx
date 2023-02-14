import React, { FC, useState } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';

import s from './EditProfileForm.module.scss';

import { useEditUserMutation } from '../../../../service/userApiSlice';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { LinkType } from '../../../../types/redux/LinkType';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { IPhotoInputType } from '../../../../types/UI/IPhotoInputType';
import Button from '../../../../ui/Button/Button';
import EmailSendedModal from '../../../../ui/modals/EmailSendedModal/EmailSendedModal';
import PhotoInput from '../../../../ui/PhotoInput/PhotoInput';
import Success from '../../../../ui/Success/Success';
import { composeFormData } from '../../../../utils/composeFormData';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import { ErrorsFromData } from '../../../server/ErrorsFromData/ErrorsFromData';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';
import EmailInput from '../../formInputs/EmailInput';
import StatusInput from '../../formInputs/StatusInput';

interface EditProfileInputs {
    email: string;
    bio: string;
}

interface IEditProfileFormProps {
    defaultValues: DefaultValues<EditProfileInputs>;
    photo: LinkType;
    id: string;
}

const EditProfileForm: FC<IEditProfileFormProps> = ({ defaultValues, photo, id }) => {
    const { handleSubmit, control } = useForm<EditProfileInputs>({
        mode: 'onChange',
        defaultValues,
    });

    const [openFilePicker, { filesContent, plainFiles }] = useFilePicker({
        accept: 'image/*',
        maxFileSize: 10,
        readAs: 'DataURL',
    });

    const [editProfile, { error, isError, isLoading, isSuccess, data }] = useEditUserMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<EditProfileInputs> = (data) => {
        const dataToForm: IFormDataItem[] = [
            {
                name: 'email',
                value: data.email,
            },
            {
                name: 'bio',
                value: data.bio,
            },
            {
                name: 'photo',
                value: plainFiles.length > 0 ? plainFiles[0] : '',
            },
        ];
        const formData = composeFormData(dataToForm);

        doAsyncFunc(async () => {
            try {
                await editProfile(formData);
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <EmailSendedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            <form onSubmit={handleSubmit(onSubmit)} className={`${s.form} mx-auto`}>
                <div className={'flex justify-center'}>
                    <PhotoInput
                        image={filesContent?.[0]?.content === undefined ? photo : filesContent?.[0]?.content}
                        openFilePicker={openFilePicker}
                        type={IPhotoInputType.circle}
                    />
                </div>
                <div className={'mb-3'}>
                    <EmailInput control={control} />
                </div>
                <div className={'mb-3'}>
                    <StatusInput control={control} />
                </div>

                <ServerResponse
                    responseError={error}
                    isError={isError}
                    isLoading={isLoading}
                    isSuccess={isSuccess}
                    messages={[
                        {
                            statusCode: 401,
                            message: 'Неверные данные',
                        },
                        {
                            statusCode: 400,
                            message: 'Не хватает полей',
                            customFunc: (errorResponse) => <ErrorsFromData errorsData={errorResponse.data} />,
                        },
                    ]}
                    onSuccess={() => {
                        if (data?.isEmailChanged === false) {
                            return setIsModalOpen(true);
                        }
                        navigate(pathsToNavigate.user(id));
                    }}
                >
                    <Success>Профиль изменен!</Success>
                </ServerResponse>
                <Button size={ButtonSizes.md} color={ButtonColors.green} type={'submit'} className={'w-full mt-3'}>
                    Изменить
                </Button>
            </form>
        </>
    );
};

export default EditProfileForm;
