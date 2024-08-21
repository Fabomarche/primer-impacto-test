import { useAddVideoGame } from '../../services/videoGameService';
import GameForm from '../../components/GameForm'
import Loading from '../../components/Loading'
import { CustomNotification } from '../../components/CustomNotification'
import { Row } from 'antd';

const AddGameScreen = () => {
    const {mutateAsync: handleAdd, isLoading, error: addError } = useAddVideoGame()

    if (isLoading) {
        return <Loading />
    }
    
    if (addError instanceof Error) {
        CustomNotification({
            type:'error',
            message:'Error',
            description:addError.message,
        })
    }

    return (
        <Row justify='center'>
            <GameForm 
                onSubmit={handleAdd}
                initialValues={null}
                isLoading={isLoading}
                error={addError as Error | null}
            />  
        </Row>
    )
}

export default AddGameScreen