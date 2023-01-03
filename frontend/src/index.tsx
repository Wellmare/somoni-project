import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './providers/authProvider';
import ThemeProvider from './providers/ThemeProvider';

import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <Provider store={store}>
    <BrowserRouter>
        <ThemeProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>,
    // </Provider>,
);
