import { useState } from 'react';
import CustomTable from '../../components/CustomTable';
import Loading from '../../components/Loading';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useVideoGames } from '../../hooks/useVideoGames';
import { useDeleteVideoGame } from '../../hooks/useDeleteVideoGame';
import { useUpdateVideoGame } from '../../hooks/useUpdateVideoGame';
import { VideoGame } from '../../services/videoGameService';
import { CustomNotification } from '../../components/CustomNotification';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const { videoGames, isLoadingGames, errorGames, reloadGames } = useVideoGames();
    const [loadingUpdateStates, setLoadingUpdateStates] = useState<Record<string, boolean>>({});
    const [loadingDeleteStates, setLoadingDeleteStates] = useState<Record<string, boolean>>({});
    const { handleDelete,  errorDelete } = useDeleteVideoGame();
    const { handleUpdate, updateError } = useUpdateVideoGame()

    const onClickDelete = async (id: string) => {
        setLoadingDeleteStates(prev => ({ ...prev, [id]: true }));
        await handleDelete(id);
        setLoadingDeleteStates(prev => ({ ...prev, [id]: false }));
        reloadGames()
        CustomNotification({
            type: 'success',
            description: 'Video Game deleted successfully',
            message: 'Success',
        });
    }

    const onClickUpdate =  async (updatedVideoGame: VideoGame) => {
        setLoadingUpdateStates(prev => ({ ...prev, [updatedVideoGame._id]: true }));
        await handleUpdate(updatedVideoGame);
        setLoadingUpdateStates(prev => ({ ...prev, [updatedVideoGame._id]: false }));
        navigate(`/update-game/${updatedVideoGame._id}`)  
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
        },
        {
            title: 'Metacritic Score',
            dataIndex: 'metacriticScore',
            key: 'metacriticScore',
        },
        {
            title: 'Update',
            key: 'update',
            render: (text: string, record: unknown) => {
                const videoGame = record as VideoGame;
                return (
                    <>
                        { loadingUpdateStates[videoGame._id] ?  <Loading size="small"/>
                            :
                            <EditOutlined onClick={() => onClickUpdate(videoGame)} />
                        }
                    
                    </>
                )
            }
        },
        {
            title: 'Delete',
            key: 'action',
            render: (text: string, record: unknown) => {
                const videoGame = record as VideoGame;
                return (
                    <>
                        { loadingDeleteStates[videoGame._id]  ? <Loading size="small"/>
                            :
                            <DeleteOutlined onClick={() => onClickDelete(videoGame._id)} />
                        }
                    </>

                )
            }
        }

        
    ]
    
    const errors = [errorGames, errorDelete, updateError];
    for (const error of errors) {
        if (error) {
            CustomNotification({ 
                type:'error', 
                message:'Error', 
                description:error.message,
            })
            return null 
        }
    }
    
    
    return (
        <div>
            <h1>Video Games</h1>
            { isLoadingGames  ? <Loading size="large"/>
                : 
                <CustomTable
                    columns={columns}
                    dataSource={videoGames}
  
                />
            }
        </div>
    );
};

export default Home;
