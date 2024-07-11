import { useAddVideoGame } from '../../services/videoGameService';
import GameForm from '../../components/GameForm'

const AddGameScreen = () => {
    const {mutateAsync: handleAdd, isLoading, error: addError } = useAddVideoGame()

    return (
        <>
            <GameForm 
                onSubmit={handleAdd}
                initialValues={null}
                isLoading={isLoading}
                error={addError as Error | null}
            />  
        </>
    )
}

export default AddGameScreen