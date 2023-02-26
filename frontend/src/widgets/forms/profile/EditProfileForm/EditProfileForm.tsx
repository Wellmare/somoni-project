import { EmailInput, StatusInput } from 'features/formInputs';
import React, { FC, useState } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEditUserMutation } from 'shared/api/user/userApiSlice';
import { ErrorsFromData, ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { preparePathToNavigate } from 'shared/lib/path';
import { composeFormData } from 'shared/lib/server';
import { IFormDataItem, LinkType } from 'shared/types/server';
import { Button, ButtonColors } from 'shared/ui/Button';
import { PhotoInput, PhotoInputType } from 'shared/ui/PhotoInput';
import { Success } from 'shared/ui/Success';
import { useFilePicker } from 'use-file-picker';
import { EmailSendedModal } from 'widgets/modals';

import s from './EditProfileForm.module.scss';

interface EditProfileInputs {
    email: string;
    bio: string;
}

interface IEditProfileFormProps {
    defaultValues: DefaultValues<EditProfileInputs>;
    photo: LinkType;
    id: string;
}

export const EditProfileForm: FC<IEditProfileFormProps> = ({ defaultValues, photo, id }) => {
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
                        type={PhotoInputType.circle}
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
                        if (data?.isEmailChanged === true) {
                            return setIsModalOpen(true);
                        }
                        navigate(preparePathToNavigate.user(id));
                    }}
                >
                    <Success>Профиль изменен!</Success>
                </ServerResponse>
                <Button color={ButtonColors.green} type={'submit'} className={'w-full mt-3 py-2.5'}>
                    Изменить
                </Button>
            </form>
        </>
    );
};
