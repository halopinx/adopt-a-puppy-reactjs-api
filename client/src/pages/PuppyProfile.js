import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router'
import PuppyAside from "../features/puppy-comps/PuppyAside";
import PuppyInfo from "../features/puppy-comps/PuppyInfo";
import AdoptForm from "../features/adopt-form/AdoptForm";
import FormContext from '../store/form-context';
import imgPlaceholder from '../assets/images/placeholder.jpg'
import Modal from '../components/ui/Modal';
import classes from './PuppyProfile.module.scss';
import useFetchData from '../hooks/useFetchData';


const PuppyProfilePage = () => {
    const { isSubmitted, setIsSubmitted } = useContext(FormContext)
    const router = useParams()
    const puppyId = router.id.split('-')[1];
    const { data, isLoading } = useFetchData(`${process.env.REACT_APP_API_URL}/puppies/${puppyId}`)
    const { name, age, gender, photoUrl, size, isVaccinated, isNeutered, traits } = data;
    const traitsList = traits?.join(', ');


    const navigate = useNavigate();
    const modalCloseHandler = () => {
        setIsSubmitted(false)
        setTimeout( () => {
            navigate('/');
        }, 500)
    }
    

    return (  
        <div className="app-container">
            <div className={classes.wrapper}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && (
                    <>
                        <PuppyAside name={name} age={age} gender={gender} photoUrl={photoUrl || imgPlaceholder}/>
                        <section className={classes.content}>
                            <h2>Puppy Profile Information</h2>
                            <div className={classes['profile-list']}>
                                <PuppyInfo heading='Size' info={size} />
                                <PuppyInfo heading='Personality traits' info={traitsList} />
                                <PuppyInfo heading='Vaccination records' info={isVaccinated ? 'Yes' : 'No'} />
                                <PuppyInfo heading='spaying/neutering' info={isNeutered ? 'Yes' : 'No'} />
                            </div>
                            {isSubmitted 
                                && <Modal 
                                        title={`Thank you for making ${name} happy!`} 
                                        message='Please expect a call from our representative regarding documents and processes. Or you may drop off in our shelter and present your identication for verification.' 
                                        onClose={modalCloseHandler}
                                    />
                            }
                            <div className={classes.action}>
                                <h3>Interested to adopt {name}?</h3>
                                <p>Please fill out the form below.</p>
                                <AdoptForm />
                            </div>

                        </section>
                    </>
                )}
               
            </div>
        </div>
    );
}
 
export default PuppyProfilePage;