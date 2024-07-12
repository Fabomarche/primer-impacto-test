import { useContext, useEffect } from 'react';
import { VideoGameContext } from '../../context/context';
import { useUpdateVideoGame } from '../../services/videoGameService' 
import Loading from '../../components/Loading'
import { CustomNotification } from '../../components/CustomNotification'
import GameForm from '../../components/GameForm'
import { useNavigate } from 'react-router';

const UpdateGameScreen = () => {
    const navigate = useNavigate()
    const { updatedVideoGame } = useContext(VideoGameContext);

    const { mutateAsync: handleUpdate, isLoading, error: updateError } = useUpdateVideoGame()
   
    useEffect(() =>{
        if (updatedVideoGame === null){
            CustomNotification({
                type: 'error',
                description:'You cant\'n navigate by url to update a video game',
                message:  'Access denied',
            });
            navigate('/')
        }
    }, [updatedVideoGame])

    if (isLoading) {
        return <Loading />
    }
    
    if (updateError instanceof Error) {
        CustomNotification({
            type:'error',
            message:'Error',
            description:updateError.message,
        })
    }

    
    return (
        <GameForm
            onSubmit={handleUpdate}
            initialValues={updatedVideoGame}
            isLoading={isLoading}
            error={updateError as Error | null}
        />
    )
}

export default UpdateGameScreen