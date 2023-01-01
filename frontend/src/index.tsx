import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './providers/authProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <Provider store={store}>
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
        ,
    </BrowserRouter>,
    // </Provider>,
);
