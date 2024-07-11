import { useState } from 'react';
import { addVideoGame, VideoGame } from '../services/videoGameService';

export const useAddVideoGame = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [addError, setAddError] = useState<Error | null>(null);

    const handleAdd = async (videoGame: VideoGame) => {
        setIsLoading(true);
        try {
            await addVideoGame(videoGame);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setAddError(error as Error);
            setIsLoading(false);
        }
    };

    return { handleAdd, isLoading, addError };
};
