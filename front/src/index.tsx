import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import LayoutProvider from './layout/layout-provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LayoutProvider>
                <QueryClientProvider client={new QueryClient()}>
                    <App />
                </QueryClientProvider>
            </LayoutProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
