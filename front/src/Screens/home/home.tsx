import { useState, useContext  } from 'react';
import CustomTable from '../../components/CustomTable';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useFetchVideoGames, useDeleteVideoGame, VideoGame } from '../../services/videoGameService';
import { VideoGameContext } from '../../context/context';
import { CustomNotification } from '../../components/CustomNotification';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const { data: videoGames, isLoading: isLoadingGames, error: errorGames } = useFetchVideoGames();
    const [loadingUpdateStates, setLoadingUpdateStates] = useState<Record<string, boolean>>({});
    const [loadingDeleteStates, setLoadingDeleteStates] = useState<Record<string, boolean>>({});
    const { mutateAsync: handleDelete, error: errorDelete } = useDeleteVideoGame();
    const { setUpdatedVideoGame } = useContext(VideoGameContext)

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
        setUpdatedVideoGame(updatedVideoGame)
        setLoadingUpdateStates(prev => ({ ...prev, [updatedVideoGame._id]: false }));
        navigate(`/update-game/${updatedVideoGame._id}`)  
    }

    const genres = Array.from(new Set(videoGames?.data.map(game => game.genre || 'undefined')))
        .map(genre => genre || 'undefined');


    
    const handleSearch = (confirm: () => void) => {
        confirm();
    };

    const handleReset =  (clearFilters: () => void, setSelectedKeys: (keys: string[]) => void, confirm: () => void) => {
        clearFilters();
        setSelectedKeys([])
        confirm()
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filterIcon: () => (
                <SearchOutlined />
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: (keys: string[]) => void, selectedKeys: string[], confirm: () => void, clearFilters: () => void }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={'Search name'}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(confirm)}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters, setSelectedKeys, confirm)} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value: string, record: VideoGame) => record.name.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            filters: genres?.map(genre => ({ text: genre, value: genre })),
            onFilter: (value: string, record: VideoGame) => record.genre ? record.genre.indexOf(value) === 0 : false,
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            render: (date: Date, record: unknown) => {
                const videoGame = record as VideoGame;
                if (videoGame.releaseDate) {
                    return new Date(videoGame.releaseDate).toISOString().split('T')[0];
                }
                return null;
            }
        },
        {
            title: 'Metacritic Score',
            dataIndex: 'metacriticScore',
            key: 'metacriticScore',
            sorter: (a: VideoGame, b: VideoGame) => (a.metacriticScore || 0) - (b.metacriticScore || 0),
            sortDirections: ['descend', 'ascend'],
        }
        ,
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
    
    const errors: (unknown)[] = [errorGames, errorDelete];
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
