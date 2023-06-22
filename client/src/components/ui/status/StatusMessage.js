import classes from './StatusMessage.module.scss';
import cn from 'classnames'

const StatusMessage = ({ message, status, className }) => {
    return (
        <div className={cn(className, classes[status])}>{message}</div>
     );
}
 
export default StatusMessage;