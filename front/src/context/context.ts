import { createContext, Dispatch, SetStateAction } from 'react';
import { VideoGame } from '../services/videoGameService';

interface VideoGameContextProps {
    updatedVideoGame: VideoGame | null;
    setUpdatedVideoGame: Dispatch<SetStateAction<VideoGame | null>>;
}

export const VideoGameContext = createContext<VideoGameContextProps>({
    updatedVideoGame: null,
    setUpdatedVideoGame: () => {},
});
