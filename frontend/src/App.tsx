import React, { FC } from 'react';

import './App.css';
import { useLoginUserMutation } from './redux/api';
// import { useGetIsLoginQuery } from './redux/api';

const App: FC = () => {
    // const count = useAppSelector(selectCount);
    // const dispatch = useAppDispatch();

    // const addCount = (count: number) => ;

    // const data = useGetIsLoginQuery(undefined);
    // console.log(data);

    const [login, { isLoading, data }] = useLoginUserMutation({ username: 'test', password: 'test' });
    console.log(login);
    console.log(isLoading);
    console.log(data);

    return (
        <>
            <div>1</div>
            <button>add count</button>
        </>
    );
};

export default App;
