import classes from './Card.module.scss'
import cn from 'classnames';

const Card = ({ children, className }) => {
    return (
        <div className={cn(classes.card, className)}>
            {children}
        </div>
    );
}
 
export default Card;