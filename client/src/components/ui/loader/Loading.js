import spinner from '../../../assets/images/spinner.svg'
import classes from './Loading.module.scss'

const Loading = ({ message }) => {
    return ( 
        <div className={classes.loader}>
          <img src={spinner} alt="" />
          {message && <p>{message}</p>}
        </div>
    );
}
 
export default Loading;