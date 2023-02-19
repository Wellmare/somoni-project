import React, { FC, useEffect } from 'react';

import Router from './components/routing/Router';
import { useAppDispatch } from './hooks/reduxHooks';
import { addNotification } from './redux/slices/notificationsSlice';
import { INotification } from './types/redux/notifications/INotification';

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // eslint-disable-next-line no-new
        const eventSource = new EventSource('http://localhost:3001/sse');

        eventSource.addEventListener('open', (event) => {
            console.log('SSE connection opened');
        });

        eventSource.addEventListener('message', (event) => {
            console.log('Received SSE notification:', event.data);
            // setNotifications((event.data as { num: string }).num);
            const data = JSON.parse(event.data);
            console.log(data);
            dispatch(addNotification(data as INotification));
        });

        eventSource.addEventListener('error', (event) => {
            console.error('SSE connection error:', event);
        });
    }, []);

    return (
        <>
            <Router />
        </>
    );
};

export default App;
