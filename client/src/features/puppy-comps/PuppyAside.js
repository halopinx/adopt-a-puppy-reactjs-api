import Card from "../../components/ui/card/Card";
import PuppyInfo from "./PuppyInfo"
import classes from './PuppyAside.module.scss'

const PuppyAside = ({ name, age, photoUrl, gender }) => {
    return ( 
        <aside>
            <Card className={classes['card-puppy']}>
                <div className={classes['card-puppy--image']}><img src={photoUrl} alt={name} /></div>
                <div className={classes['card-puppy--details']}>
                    <h1>{name}</h1>  
                    <PuppyInfo heading='Age' info={age} />
                    <PuppyInfo heading='Gender' info={gender} />
                </div>
            </Card>
        </aside>
     );
}
 
export default PuppyAside;