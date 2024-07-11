import { useQuery, useMutation } from 'react-query';

const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

export interface VideoGame {
    _id: string;
    name: string;
    genre: string;
    releaseDate: Date | null;
    metacriticScore: number | null;
}

export const useFetchVideoGames = () => {
    return useQuery('videoGames', async () => {
        const response = await fetch(`${backendUrl}/video-games`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch video games. Status: ${response.status}`);
        }
        const data: VideoGame[] = await response.json();
        return data;
    });
};

export const useDeleteVideoGame = () => {
    return useMutation(async (id: string) => {
        const response = await fetch(`${backendUrl}/video-games/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete video game with id ${id}. Status: ${response.status}`);
        }
        return response.json();
    });
};

export const useAddVideoGame = () => {
    return useMutation(async (videoGame: VideoGame) => {
        const response = await fetch(`${backendUrl}/video-games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(videoGame),
        });
        if (!response.ok) {
            throw new Error(`Failed to add video game. Status: ${response.status}`);
        }
        return response.json();
    });
};

export const useUpdateVideoGame = () => {
    return useMutation(async (updatedVideoGame: VideoGame) => {
        const response = await fetch(`${backendUrl}/video-games/${updatedVideoGame._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedVideoGame),
        });
        if (!response.ok) {
            throw new Error(`Failed to update video game with id ${updatedVideoGame._id}. Status: ${response.status}`);
        }
        return response.json();
    });
};
