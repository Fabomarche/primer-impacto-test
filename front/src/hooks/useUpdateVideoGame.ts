import { useState } from 'react';
import { updateVideoGame, VideoGame } from '../services/videoGameService';

export const useUpdateVideoGame = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [updateError, setUpdateError] = useState<Error | null>(null);

    const handleUpdate = async (updatedVideoGame: VideoGame) => {
        setIsLoading(true);
        try {
            await updateVideoGame(updatedVideoGame);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setUpdateError(error as Error);
            setIsLoading(false);
        }
    };

    return { handleUpdate, isLoading, updateError };
};
