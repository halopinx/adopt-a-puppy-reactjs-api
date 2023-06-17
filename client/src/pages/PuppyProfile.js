import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router'
import PuppyAside from "../features/puppy-comps/PuppyAside";
import PuppyInfo from "../features/puppy-comps/PuppyInfo";
import AdoptForm from "../features/adopt-form/AdoptForm";
import FormContext from '../store/form-context';
import imgPlaceholder from '../assets/images/placeholder.jpg'
import Modal from '../components/ui/modal/Modal';
import Loading from '../components/ui/loader/Loading';
import StatusMessage from '../components/ui/status/StatusMessage';
import classes from './PuppyProfile.module.scss';
import useFetchData from '../hooks/useFetchData';


const PuppyProfilePage = () => {
    const { isSubmitted, setIsSubmitted } = useContext(FormContext)
    const router = useParams()
    const puppyId = router.id.split('-')[1];

    const { data, isLoading, error } = useFetchData(`${process.env.REACT_APP_API_URL}/puppies/${puppyId}`)
    const traitsList = data?.traits?.join(', ');

    const navigate = useNavigate();
    const modalCloseHandler = () => {
        setIsSubmitted(false)
        setTimeout( () => {
            navigate('/');
        }, 500)
    }
    
    if (isLoading) {
        return (
            <div className='app-container'>
                <Loading message='Puppy profile loading...' />
            </div>
        )
    }
    if (error) {
        return (
            <div className='app-container'>
                <StatusMessage message={`Something went wrong: ${error}`} />
            </div>
        )
    }

    return (  
        <div className="app-container">
            <div className={classes.wrapper}>
                <PuppyAside name={data?.name} age={data?.age} gender={data?.gender} photoUrl={data?.photoUrl || imgPlaceholder}/>
                <section className={classes.content}>
                    <h2>Puppy Profile Information</h2>
                    <div className={classes['profile-list']}>
                        <PuppyInfo heading='Size' info={data?.size} />
                        <PuppyInfo heading='Personality traits' info={traitsList} />
                        <PuppyInfo heading='Vaccination records' info={data?.isVaccinated ? 'Yes' : 'No'} />
                        <PuppyInfo heading='spaying/neutering' info={data?.isNeutered ? 'Yes' : 'No'} />
                    </div>
                    {isSubmitted 
                        && <Modal 
                                title={`Thank you for making ${data?.name} happy!`} 
                                message='Please expect a call from our representative regarding documents and processes. Or you may drop off in our shelter and present your identication for verification.' 
                                onClose={modalCloseHandler}
                            />
                    }
                    <div className={classes.action}>
                        <h3>Interested to adopt {data?.name}?</h3>
                        <p>Please fill out the form below.</p>
                        <AdoptForm />
                    </div>

                </section>
            </div>
        </div>
    );
}
 
export default PuppyProfilePage;