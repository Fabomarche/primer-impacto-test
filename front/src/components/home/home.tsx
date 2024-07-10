import CustomTable from '../CustomTable';
import Loading from '../Loading';
import { useVideoGames } from '../../hooks/useVideoGames';


const Home = () => {
    const { videoGames, isLoading, error } = useVideoGames();

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
        
    ]
    
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    
    return (
        <div>
            <h1>Video Games</h1>
            { isLoading ? <Loading size="large"/>
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
