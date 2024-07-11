import { useAddVideoGame } from '../../hooks/useAddVideoGame'
import GameForm from '../GameForm'

const AddGameScreen = () => {
    const { handleAdd, isLoading, addError } = useAddVideoGame()
    const defaultGame = {
        _id: '',
        name: '',
        genre: '',
        releaseDate: null,
        metacriticScore: null,
    };



    return (
        <>
            <GameForm 
                onSubmit={handleAdd}
                initialValues={defaultGame}
                isLoading={isLoading}
                error={addError}
            />  
        </>
    )
}

export default AddGameScreen