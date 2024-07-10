const backendUrl: string = import.meta.env.VITE_BACKEND_URL as string;

export interface VideoGame {
    id: string;
    name: string;
    genre: string;
    releaseDate: Date;
    metacriticScore: number;
}

export const fetchVideoGames = async (): Promise<VideoGame[]> => {
    const response = await fetch(`${backendUrl}/video-games`, {
        method: 'GET'
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch video games. Status: ${response.status}`);
    }
    const data: VideoGame[] = await response.json()
    return data
}

export const deleteVideoGame = async (id: string): Promise<any> => {
    const response = await fetch(`${backendUrl}/video-games/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete video game with id ${id}. Status: ${response.status}`);
    }
    return response.json();
}

export const addVideoGame = async (videoGame: VideoGame): Promise<VideoGame> => {
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
}

export const updateVideoGame = async (id: string, updatedVideoGame: VideoGame): Promise<VideoGame> => {
    const response = await fetch(`${backendUrl}/video-games/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideoGame),
    });
    if (!response.ok) {
        throw new Error(`Failed to update video game with id ${id}. Status: ${response.status}`);
    }
    return response.json();
}
