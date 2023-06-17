import PuppyCard from '../features/puppy-comps/PuppyCard';
import Button from '../components/ui/button/Button';
import Loading from '../components/ui/loader/Loading';
import StatusMessage from '../components/ui/status/StatusMessage';
import classes from './Home.module.scss'
import useFetchData from '../hooks/useFetchData'


const HomePage = () => {
    const { data, isLoading, error } = useFetchData(`${process.env.REACT_APP_API_URL}/puppies`);

    if (error) {
        return (
            <div className='app-container'>
                <StatusMessage message={`Something went wrong: ${error}`} />
            </div>
        )
    }

    return (
        <div className='app-container'>
            <h1 className={classes.heading}>Featured Puppies to adapt</h1>
            { isLoading && <Loading message='Fetching data...' />}
            { !isLoading && (
                <div className={classes.wrapper}>
                    {
                        data?.slice(0,4).map(data => {
                            const link = `/${data.name}-${data._id}`.toLowerCase();
                            return (
                                <PuppyCard 
                                    key={data._id} 
                                    details={{
                                        name: data.name, 
                                        age: data.age,
                                        gender: data.gender,
                                        image: data.photoUrl, 
                                        link: link
                                    }}
                                />
                            )
                            })
                    }
                </div>
            )}
            <div className={classes.action}><Button link='/find-your-puppy'>See more puppies</Button></div>
        </div>
    );
}
 
export default HomePage;