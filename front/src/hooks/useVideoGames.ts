import { useState, useEffect } from 'react';
import { fetchVideoGames, VideoGame  } from '../services/videoGameService'

interface VideoGameResponse {
    data: VideoGame[];
}

export const useVideoGames = () => {
    const [videoGames, setVideoGames] = useState<VideoGame[]>([]);
    const [isLoadingGames, setIsLoadingGames] = useState(true);
    const [errorGames, setErrorGames] = useState<Error | null>(null);

    const loadVideoGames = async () => {
        setIsLoadingGames(true);
        try {
            const games = await fetchVideoGames() as unknown as VideoGameResponse;
            setVideoGames(games.data);
            setIsLoadingGames(false);
        } catch (error) {
            console.error(error);
            setErrorGames(error as Error);
            setIsLoadingGames(false);
        }
    };

    useEffect(() => {
        loadVideoGames();
    }, []);

    return { videoGames, isLoadingGames, errorGames, reloadGames: loadVideoGames };
};
