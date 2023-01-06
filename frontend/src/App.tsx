import React, { FC } from 'react';

import Routing from './components/Routing/Routing';
import TestFormCreatePost from './components/TestFormCreatePost';
import TestLogin from './components/TestLogin';
import TestPosts from './components/TestPosts';

const App: FC = () => {
    return (
        <>
            <TestLogin />
            <TestFormCreatePost />
            <TestPosts />
            <Routing />
        </>
    );
};

export default App;
