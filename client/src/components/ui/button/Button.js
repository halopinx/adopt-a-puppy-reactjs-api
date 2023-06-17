import { Link } from "react-router-dom";
import cn from 'classnames'
import classes from './Button.module.scss'

const Button = ({ children, link, variant, className, ...props }) => {
    if (variant === 'button') {
        return (
            <button className={cn(classes.button, className)} {...props}>
                {children}
            </button>
        )
    }

    return ( 
       <Link to={link} className={cn(classes.button, className)} {...props}>
             {children}
        </Link>
    );
}
 
export default Button;