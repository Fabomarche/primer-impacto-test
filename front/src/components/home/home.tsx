import CustomTable from '../CustomTable';
import Loading from '../Loading';
import { DeleteOutlined } from '@ant-design/icons';
import { useVideoGames } from '../../hooks/useVideoGames';
import { useDeleteVideoGame } from '../../hooks/useDeleteVideoGame';
import { VideoGame } from '../../services/videoGameService';

const Home = () => {
    const { videoGames, isLoadingGames, errorGames, reloadGames } = useVideoGames();
    const { handleDelete, isLoadingDelete, errorDelete } = useDeleteVideoGame();

    const onClickDelete = async (id: string) => {
        await handleDelete(id)
        reloadGames()
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
            title: 'Delete',
            key: 'action',
            render: (text: string, record: unknown) => {
                const videoGame = record as VideoGame;
                return (
                    <>
                        { isLoadingDelete ? <Loading size="small"/>
                            :
                            <DeleteOutlined onClick={() => onClickDelete(videoGame._id)} />
                        }
                    </>

                )
            }
        }

        
    ]
    
    if (errorGames) {
        return <div>Error: {errorGames.message}</div>;
    }

    if (errorDelete) {
        return <div>Error: {errorDelete.message}</div>;
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
