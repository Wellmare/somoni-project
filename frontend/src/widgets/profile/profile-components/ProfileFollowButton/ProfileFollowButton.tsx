import { ProfileContext } from 'app/context/ProfileContext';
import React, { FC, useContext } from 'react';

import { useFollowToProfileMutation } from 'shared/api/user/userApiSlice';
import { ServerResponse } from 'shared/components';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { Button, ButtonColors, ButtonSizes } from 'shared/ui/Button';
import { Loader, LoaderSize } from 'shared/ui/Loader';

export const ProfileFollowButton: FC = () => {
    const { profile } = useContext(ProfileContext);
    if (profile === null) return null;
    const { profileId, isFollowed } = profile;

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
            {isFollowed ? (
                <Button color={ButtonColors.gray} size={ButtonSizes.sm} className={'ml-0 md:ml-3'} onClick={onClick}>
                    Отписаться
                </Button>
            ) : (
                <Button color={ButtonColors.green} size={ButtonSizes.sm} className={'ml-0 md:ml-3'} onClick={onClick}>
                    Подписаться
                </Button>
            )}
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
