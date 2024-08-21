import React, {useState} from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { VideoGameContext } from './context/context';
import { VideoGame } from './services/videoGameService';
import AppLayout from './layout/app-layout';
import Router from './routes/router';
import routes from './routes/routes';

const queryClient = new QueryClient();

function App() {
    const [updatedVideoGame, setUpdatedVideoGame] = useState<VideoGame | null>(null)

    return (
        <>
            <React.Fragment>
                <QueryClientProvider client={queryClient}>
                    <VideoGameContext.Provider value={{ updatedVideoGame, setUpdatedVideoGame }}>
                        <AppLayout>
                            <Router routes={routes} />
                        </AppLayout>
                    </VideoGameContext.Provider>
                </QueryClientProvider>
            </React.Fragment>
        </>
    );
}

export default App;
