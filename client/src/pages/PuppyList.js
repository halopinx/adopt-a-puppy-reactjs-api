import { useReducer, useEffect } from 'react'
import PuppyCard from "../features/puppy-comps/PuppyCard";
import Input from '../components/ui/form/Input';
import Button from '../components/ui/Button';
import classes from './PuppyList.module.scss'
import axios from 'axios';


const initialState = {
    queries: '',
    age: '',
    breed: '',
    gender: '',
    data: []
}

const queryReducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH': 
            return { ...state, queries: action.value.toLowerCase(), data: [...action.data] }
        case 'SEARCH_AGE':
            return { ...state,  age: action.value, data: [...action.data] }
        case 'SEARCH_BREED':
            return { ...state,  breed: action.value.toLowerCase(), data: [...action.data] }
        case 'SEARCH_GENDER':
            return { ...state,  gender: action.value.toLowerCase(), data: [...action.data] }
        case 'RESET':
            return {...initialState}; 
        default:
            return state;
    }
}

const PuppyListPage = () => {
    const [queryState, dispatch] = useReducer(queryReducer, initialState);

    const filterSearch = (target) => {
        return initialState.data.filter(data => 
            data.name.toLowerCase().includes(target) || 
            data.breed.toLowerCase().includes(target) || 
            data.age.toString() === target || 
            data.gender.toLowerCase() === target
        )
    }
   
   const ages = initialState.data.map( data => data.age);
   const minAge = Math.min(...ages);
   const maxAge = Math.max(...ages);
   const breedArr = initialState.data.map(data => data.breed).filter((breed, i, arr) => arr.indexOf(breed) === i );

   const searchHandler = (e) => {
        dispatch({ type: 'SEARCH', value: e.target.value, data: filterSearch(e.target.value) })
    }

   const ageFilterHandler = (e) => {
        dispatch({ type: 'SEARCH_AGE', value: e.target.value, data: filterSearch(e.target.value) })
   }

   const breedFilterHandler = (e) => {
        dispatch({ type: 'SEARCH_BREED', value: e.target.value, data: filterSearch(e.target.value) })
   }

   const genderFilterHandler = (e) => {
        dispatch({ type: 'SEARCH_GENDER', value: e.target.value, data: filterSearch(e.target.value) })
   }

   const resetFilterHandler = () => dispatch({ type: 'RESET' })


   useEffect(() => {
       const fetchData = async () => {
           const response = await axios.get(`${process.env.REACT_APP_API_URL}/puppies`);
           const d = await response.data;
           initialState.data = [...d];
       }

     fetchData()

   }, [dispatch])


    return ( 
        <div className="app-container">
                <div className={classes.wrapper}>
                <aside className={classes.filters}>
                    <h3>Filter puppy</h3>
                    <Input type="search" placeholder="Search puppy..." onChange={searchHandler} value={queryState.queries}/>
                    <Input type='number' min={minAge} max={maxAge} onChange={ageFilterHandler} placeholder='All ages' label='Age' value={queryState.age} />
                    <Input variant='select' name='breed' onChange={breedFilterHandler} label='Breed' value={queryState.breed}>
                        <option value="">All Breed</option>
                        {
                            breedArr.map((breed, index) => <option key={index} value={breed.toLowerCase()}>{breed}</option>)
                        }
                    </Input>
                    <Input variant='select' name='gender' onChange={genderFilterHandler} label='Gender' value={queryState.gender}>
                        <option value="">All Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                    <Button variant='button' onClick={resetFilterHandler} className={classes.reset}>Clear Filters</Button>
                </aside>
                <div className={classes.results}>
                    {queryState.data.map(data => {
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
                </div>
        </div>
    );
}
 
export default PuppyListPage;