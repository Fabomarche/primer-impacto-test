import React from 'react';
import './App.css';
import AppLayout from './layout/app-layout';
import Router from './routes/router';
import routes from './routes/routes';

function App() {
    return (
        <>
            <React.Fragment>
                <AppLayout>
                    <Router routes={routes} />
                </AppLayout>
            </React.Fragment>
        </>
    );
}

export default App;
