import { useState, useEffect } from 'react';
import { fetchVideoGames, VideoGame  } from '../services/videoFameService'

interface VideoGameRsponse {
    data: VideoGame[];
}

export const useVideoGames = () => {
    const [videoGames, setVideoGames] = useState<VideoGame[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getVideoGames = async () => {
            try {
                const games = await fetchVideoGames() as unknown as VideoGameRsponse;
                setVideoGames(games.data);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error as Error);
                setIsLoading(false);
            }
        };

        getVideoGames();
    }, []);

    return { videoGames, isLoading, error };
};
