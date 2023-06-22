import spinner from '../../../assets/images/spinner.svg'
import classes from './Loading.module.scss'
import cn from 'classnames';

const Loading = ({ message, className }) => {
    return ( 
        <div className={cn(className, classes.loader)}>
          <img src={spinner} alt="" />
          {message && <p>{message}</p>}
        </div>
    );
}
 
export default Loading;