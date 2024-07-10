import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLayout from './layout/app-layout';
import Router from './routes/router';
import routes from './routes/routes';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <React.Fragment>
                <QueryClientProvider client={queryClient}>
                    <AppLayout>
                        <Router routes={routes} />
                    </AppLayout>
                </QueryClientProvider>
            </React.Fragment>
        </>
    );
}

export default App;
