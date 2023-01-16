import classNames from 'classnames';
import React, { FC } from 'react';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';

import { useEditUserMutation } from '../../../../service/userApiSlice';
import { IFormDataItem } from '../../../../types/IFormDataItem';
import { LinkType } from '../../../../types/redux/LinkType';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { composeFormData } from '../../../../utils/composeFormData';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import { pathsToNavigate } from '../../../../utils/pathsToNavigate';
import Button from '../../../common/Button/Button';
import { ErrorsFromData } from '../../../common/ErrorsFromData/ErrorsFromData';
import PhotoInput from '../../../common/PhotoInput/PhotoInput';
import s from '../../../common/PhotoInput/PhotoInput.module.scss';
import ServerResponse from '../../../common/ServerResponse/ServerResponse';
import Success from '../../../common/Success/Success';
import EmailInput from '../../formInputs/EmailInput';
import StatusInput from '../../formInputs/StatusInput';
import UsernameInput from '../../formInputs/UsernameInput';

interface EditProfileInputs {
    username: string;
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
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<EditProfileInputs> = (data) => {
        const dataToForm: IFormDataItem[] = [
            {
                name: 'username',
                value: data.username,
            },
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
                navigate(pathsToNavigate.user(id));
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PhotoInput
                    image={filesContent?.[0]?.content === undefined ? photo : filesContent?.[0]?.content}
                    openFilePicker={openFilePicker}
                    className={classNames(s.avatar)}
                />

                <UsernameInput control={control} />
                <EmailInput control={control} />

                <StatusInput control={control} />

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
                >
                    <Success>Профиль изменен!</Success>
                </ServerResponse>
                <Button size={ButtonSizes.md} color={ButtonColors.green} type={'submit'}>
                    Изменить
                </Button>
            </form>
        </>
    );
};

export default EditProfileForm;
