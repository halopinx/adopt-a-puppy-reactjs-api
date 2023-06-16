import axios from 'axios';
import { useEffect , useState } from 'react';
import PuppyCard from '../features/puppy-comps/PuppyCard';
import Button from '../components/ui/Button';
import classes from './Home.module.scss'

const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await axios.get(`${process.env.REACT_APP_API_URL}/puppies`, {});
            // const d = await response.data;
            await axios.get(`${process.env.REACT_APP_API_URL}/puppies`)
                       .then(res => console.log(res))
                       .catch(error => console.log(error))  
        }

        fetchData()
    }, [])

    console.log(process.env.REACT_APP_API_URL)

    return (
        <div className='app-container'>
            <h1 className={classes.heading}>Featured Puppies to adapt</h1>
            <div className={classes.wrapper}>
                {data.slice(0,4).map(data => {
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
                })}
            </div>
            <div className={classes.action}><Button link='/find-your-puppy'>See more puppies</Button></div>
        </div>
    );
}
 
export default HomePage;