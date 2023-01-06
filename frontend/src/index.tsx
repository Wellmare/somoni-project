import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import ThemeProvider from './providers/ThemeProvider';

import './styles/global.css';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
);
