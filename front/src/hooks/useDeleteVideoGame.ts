import { useState } from 'react';
import { deleteVideoGame } from '../services/videoGameService'

export const useDeleteVideoGame = () => {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [errorDelete, setErrorDelete] = useState<Error | null>(null);

    const handleDelete = async (id: string) => {
        setIsLoadingDelete(true);
        try {
            await deleteVideoGame(id);
            setIsLoadingDelete(false);
        } catch (error) {
            console.error(error);
            setErrorDelete(error as Error);
            setIsLoadingDelete(false);
        }
    };

    return { handleDelete, isLoadingDelete, errorDelete };
};
