import { useUpdateVideoGame } from '../../hooks/useUpdateVideoGame' 
import GameForm from '../../components/GameForm'

const UpdateGameScreen = () => {
    const { handleUpdate, isLoading, updateError } = useUpdateVideoGame()
    return (
        <GameForm
            onSubmit={handleUpdate}
            initialValues={}
            isLoading={isLoading}
            error={updateError}
        />
    )
}

export default UpdateGameScreen