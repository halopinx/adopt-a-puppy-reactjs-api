import ReactDOM from "react-dom";
import Card from "../card/Card";
import classes from './Modal.module.scss'


const ModalElement = ({ title, message, onClose }) => {
    return (
        <div className={classes.backdrop}>
            <Card className={classes.content}>
                <h3>{title}</h3>
                <p>{message}</p>
                <button onClick={onClose} className={classes.action}>&times;</button>
            </Card>
        </div>
    )
}

const Modal = ({ title, message, onClose}) => {
    return ( 
        <>
            {ReactDOM.createPortal(<ModalElement message={message} title={title} onClose={onClose} />, document.getElementById('overlays'))}
        </>
    );
}
 
export default Modal;