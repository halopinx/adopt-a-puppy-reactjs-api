import { useField } from "formik";
import StatusMessage from "../StatusMessage";
import Input from "./Input";
import classes from './FormikInput.module.scss'

const FormikInput = ({ label, id, ...props }) => {
    const [field, meta] = useField(props)
    const isInvalid = meta.error && meta.touched;

    return (
        <div className={classes.field}>
            <label htmlFor={id}>{label}</label>
            <div className={classes['field-input']}>
                <Input id={id} {...props} {...field} className={isInvalid ? classes.error : ''} />
                {isInvalid && <StatusMessage message={meta.error} status='error' />}
            </div>
        </div>
    );
}
 
export default FormikInput;