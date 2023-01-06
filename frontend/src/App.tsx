import React, { FC } from 'react';

import Routing from './components/Routing/Routing';
import TestLogin from './components/TestLogin';

const App: FC = () => {
    return (
        <>
            <TestLogin />
            {/* <TestFormCreatePost /> */}
            {/* <TestPosts /> */}
            <Routing />
        </>
    );
};

export default App;
