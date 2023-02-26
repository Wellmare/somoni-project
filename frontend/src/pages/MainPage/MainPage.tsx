import { Paths } from 'app/constants/Paths';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyGetUserInfoQuery } from 'shared/api/user/userApiSlice';
import { useAppSelector } from 'shared/hooks/reduxHooks';
import { doAsyncFunc } from 'shared/lib/doAsyncFunc';
import { selectUserId } from 'shared/store/slices/authSlice';
import { EmailNotConfirmedCard } from 'widgets/EmailNotConfirmedCard';
import { SearchByTagForm } from 'widgets/forms';
import { EmailSendedModal } from 'widgets/modals';
import { PostsByPage } from 'widgets/PostsByPage';

export const MainPage: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();

    useEffect(() => {
        if (state?.from === Paths.REGISTER) {
            setIsOpen(true);
        }
    }, []);

    const userId = useAppSelector(selectUserId);
    // if (userId === null) return <Error>User id не найден</Error>;

    const [getUserInfo, { data }] = useLazyGetUserInfoQuery();
    useEffect(() => {
        if (userId !== null) {
            doAsyncFunc(async () => {
                console.log('fetch user info');
                await getUserInfo({ userId });
            });
        }
    }, [userId]);

    return (
        <>
            {isOpen && <EmailSendedModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            <div>
                {data?.isEmailConfirmed === false && <EmailNotConfirmedCard />}
                <div className='on-mobile'>
                    <div className={'flex justify-center mb-5'}>
                        <SearchByTagForm />
                    </div>
                </div>
                <PostsByPage />
            </div>
        </>
    );
};
