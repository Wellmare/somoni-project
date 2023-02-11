import React, { FC, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import SearchByTagForm from '../../components/forms/SearchByTagForm/SearchByTagForm';
import Posts from '../../components/posts/Posts/Posts';
import { Paths } from '../../constants/Paths';
import EmailSendedModal from '../../ui/modals/EmailSendedModal/EmailSendedModal';

const MainPage: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();
    console.log(state?.from);

    useEffect(() => {
        if (state?.from === Paths.REGISTER) {
            setIsOpen(true);
        }
    }, []);

    return (
        <>
            {isOpen && <EmailSendedModal isOpen={isOpen} setIsOpen={setIsOpen} />}
            <div>
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
