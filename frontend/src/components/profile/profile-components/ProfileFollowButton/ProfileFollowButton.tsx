import React, { FC, useContext } from 'react';

import { ProfileContext } from '../../../../context/ProfileContext';
import { useFollowToProfileMutation } from '../../../../service/userApiSlice';
import { ButtonColors, ButtonSizes } from '../../../../types/UI/Button.types';
import { LoaderSize } from '../../../../types/UI/Loader.types';
import Button from '../../../../ui/Button/Button';
import Loader from '../../../../ui/Loader/Loader';
import { doAsyncFunc } from '../../../../utils/doAsyncFunc';
import ServerResponse from '../../../server/ServerResponse/ServerResponse';

const ProfileFollowButton: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { profileId } = profile;

    const [follow, { isError, error, isSuccess, isLoading }] = useFollowToProfileMutation();

    const onClick = (): void => {
        doAsyncFunc(async () => {
            try {
                await follow({ userId: profileId });
            } catch (e) {
                console.log(e);
            }
        });
    };

    return (
        <>
            <Button color={ButtonColors.green} size={ButtonSizes.sm} className={'ml-0 md:ml-3'} onClick={onClick}>
                Подписаться
            </Button>
            <ServerResponse
                responseError={error}
                isError={isError}
                isLoading={isLoading}
                isSuccess={isSuccess}
                loader={<Loader size={LoaderSize.sm} />}
            >
                <></>
            </ServerResponse>
        </>
    );
};

export default ProfileFollowButton;
