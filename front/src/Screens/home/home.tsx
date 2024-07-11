import { useState } from 'react';
import CustomTable from '../../components/CustomTable';
import Loading from '../../components/Loading';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useFetchVideoGames, useDeleteVideoGame, useUpdateVideoGame, VideoGame } from '../../services/videoGameService';
import { CustomNotification } from '../../components/CustomNotification';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const { data: videoGames, isLoading: isLoadingGames, error: errorGames } = useFetchVideoGames();
    const [loadingUpdateStates, setLoadingUpdateStates] = useState<Record<string, boolean>>({});
    const [loadingDeleteStates, setLoadingDeleteStates] = useState<Record<string, boolean>>({});
    const { mutateAsync: handleDelete, error: errorDelete } = useDeleteVideoGame();
    const { mutateAsync: handleUpdate, error: errorUpdate } = useUpdateVideoGame();

    const onClickDelete = async (id: string) => {
        setLoadingDeleteStates(prev => ({ ...prev, [id]: true }));
        await handleDelete(id);
        setLoadingDeleteStates(prev => ({ ...prev, [id]: false }));
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
    
    const errors: (unknown)[] = [errorGames, errorDelete, errorUpdate];
    for (const error of errors) {
        if (error instanceof Error) {
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
                    dataSource={videoGames?.data}
                />
            }
        </div>
    );
};

export default Home;
