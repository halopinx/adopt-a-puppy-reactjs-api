import classes from './StatusMessage.module.scss'

const StatusMessage = ({ message, status }) => {
    return (
        <div className={classes[status]}>{message}</div>
     );
}
 
export default StatusMessage;