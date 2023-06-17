import Card from "../../components/ui/card/Card";
import Button from "../../components/ui/button/Button";
import classes from './PuppyCard.module.scss'

const PuppyCard = ({ details }) => {

    const { name, age, gender, image, link } = details;

    return (
        <Card className={classes['card-puppy']}>
            <div className={classes['card-puppy--image']}>
                <img src={image} alt={name} />
            </div>
            <div className={classes['card-puppy--details']}>
                <h3>{`${name}, ${age} year${age > 1 ? 's' : ''} old, ${gender}`}</h3>
                <Button link={link} className='font-regular'>Get to know {name}</Button>
            </div>
        </Card>
    );
}
 
export default PuppyCard;