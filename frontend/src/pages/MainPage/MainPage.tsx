import React, { FC } from 'react';

import SearchByTagForm from '../../components/forms/SearchByTagForm/SearchByTagForm';
import Posts from '../../components/posts/Posts/Posts';

const MainPage: FC = () => {
    return (
        <>
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
