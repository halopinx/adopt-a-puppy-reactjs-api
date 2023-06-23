import { useState, useReducer } from 'react'
import PuppyCard from "../features/puppy-comps/PuppyCard";
import Input from '../components/ui/form/Input';
import Button from '../components/ui/button/Button';
import classes from './PuppyList.module.scss';
import Loading from '../components/ui/loader/Loading';
import StatusMessage from '../components/ui/status/StatusMessage';
import useFetchData from '../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';

const initialState = {
    search: '',
    age: '',
    breed: '',
    gender: ''
}

const queryReducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH': 
            return {...state, search: action.value.toLowerCase() }
        case 'AGE':
            return { ...state, age: action.value }
        case 'BREED':
            return { ...state, breed: action.value }
        case 'GENDER':
            return { ...state, gender: action.value.toLowerCase() }
        case 'RESET':
            return { ...initialState}; 
        default:
            return state;
    }
}

const PuppyListPage = () => {

    const navigate = useNavigate();

    const [queryState, dispatch] = useReducer(queryReducer, initialState);
    const [query, setQuery] = useState(null);
    const { data, isLoading, error, refetch } = useFetchData(`${process.env.REACT_APP_API_URL}/puppies`);
    const { data: allPuppies } = useFetchData(`${process.env.REACT_APP_API_URL}/puppies/all`);
    
   
    const breedArr = allPuppies?.map(item => item.breed).filter((uniqueItem, i, arr) => arr.indexOf(uniqueItem) === i);
    const minAge = Math.min.apply(null, allPuppies?.map(item => item.age))
    const maxAge = Math.max.apply(null, allPuppies?.map(item => item.age))

    const addNavigate = (navigateTo) => {
        const transformedQueries = Object.entries(navigateTo).map((key, index, arr) => {
            const isEmptySearch = key[1].trim() === '' && key[0] === 'q'
            const isEmptyAge = key[1].trim() === '' && key[0] === 'age'
            const isLastIndex =  index === arr.length - 1;
            return isEmptySearch || isEmptyAge ? '' : key.join('=') + `${isLastIndex ? ''  : '&'}`
        }).join('')

        console.log('navigateTo', navigateTo)
        
        //remove unneccessry '&' at the end of the search location params
        const params = /&$/.test(transformedQueries) ? transformedQueries.replace('&', '') : transformedQueries
        navigate(`/find-your-puppy?${params}`)

        // if(navigateTo.breed === 'all'){
        //     refetch(`${process.env.REACT_APP_API_URL}/puppies`);
        // }
        refetch(`${process.env.REACT_APP_API_URL}/puppies?${transformedQueries}`);
    }

    const ageFilterHandler = (e) => {
        dispatch({ type: 'AGE', value: e.target.value })
        setQuery(prev => ({ ...prev, age: e.target.value }))
        addNavigate({ ...query, age: e.target.value})    
    }

    const genderFilterHandler = (e) => {
        dispatch({ type: 'GENDER', value: e.target.value })
        setQuery(prev => ({ ...prev, gender: e.target.value }))
        addNavigate({ ...query, gender: e.target.value}) 
    }

    const breedFilterHandler = (e) => {
        dispatch({ type: 'BREED', value: e.target.value })
        setQuery(prev => ({ ...prev, breed: e.target.value }))
        addNavigate({ ...query, breed: e.target.value})
    }

    const searchHandler = (e) => {
        dispatch({ type: 'SEARCH', value: e.target.value })
        addNavigate({ ...query, q: e.target.value })    
        setQuery(prev => ({ ...prev, q: e.target.value }));
    }

    const resetHandler = () => {
        navigate(`/find-your-puppy`)
        refetch(`${process.env.REACT_APP_API_URL}/puppies`)
        setQuery(null)
        dispatch({ type: 'RESET' })
    }
    
    console.log('query', query)

    return ( 
        <div className="app-container">
                <div className={classes.wrapper}>
                <aside className={classes.filters}>
                    <h3>Filter puppy</h3>
                    <Input type="search" placeholder="Search puppy..." onChange={searchHandler} value={queryState.search}/>
                    <Input type='number' min={minAge} max={maxAge} placeholder='All ages' label='Age' onChange={ageFilterHandler} value={queryState.age} />
                    <Input variant='select' name='breed' onChange={breedFilterHandler} label='Breed' value={queryState.breed}>
                        <option value="all">All Breed</option>
                        {
                          breedArr?.map((breed, index) => <option key={index} value={breed}>{breed}</option>)
                        }
                    </Input>
                    <Input variant='select' name='gender' label='Gender' onChange={genderFilterHandler} value={queryState.gender}>
                        <option value="all">All Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Input>
                    <Button variant='button' className={classes.reset} onClick={resetHandler} disabled={!query}>Clear Filters</Button>
                </aside>
                <div className={classes.results}>
                    { error && <StatusMessage message={`Something went wrong in your query: ${error}`} className={classes.error} />}
                    { (data?.length === 0 && !isLoading) && <StatusMessage message='Sorry, no data is fetch within your filter query.'  className={classes.nodata} /> }
                    { isLoading 
                        ? <Loading message='Loading data...' className={classes.loading}/> 
                        : data?.map(data => {
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
                </div>
        </div>
    );
}
 
export default PuppyListPage;