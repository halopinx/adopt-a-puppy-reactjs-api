import classes from './Input.module.scss'

const Input = ({ label, id, variant, children, ...props}) => {
    if (variant === 'select') {
        return (
            <div className={classes.field}>
                {label && <label htmlFor={id}>{label}</label>}
                <select {...props} className={classes['field-select']}>
                    {children}
                </select>
            </div>
        )
    }

    return (
        <div className={classes.field}>
            {label && <label htmlFor={id}>{label}</label>}
            <input {...props} id={id} />
        </div>
    );
}
 
export default Input;