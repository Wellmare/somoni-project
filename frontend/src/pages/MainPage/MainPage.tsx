import React, { FC, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import SearchByTagForm from '../../components/forms/SearchByTagForm/SearchByTagForm';
import Posts from '../../components/posts/Posts/Posts';
import { Paths } from '../../constants/Paths';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectUserId } from '../../redux/slices/authSlice';
import { useLazyGetUserInfoQuery } from '../../service/userApiSlice';
import EmailNotConfirmedCard from '../../ui/EmailNotConfirmedCard/EmailNotConfirmedCard';
import EmailSendedModal from '../../ui/modals/EmailSendedModal/EmailSendedModal';
import { doAsyncFunc } from '../../utils/doAsyncFunc';

const MainPage: FC = () => {
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
                <Posts />
            </div>
        </>
    );
};

export default MainPage;
