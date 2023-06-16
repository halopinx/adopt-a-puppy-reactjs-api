import classes from './PuppyInfo.module.scss'

const PuppyInfo = ({ heading, info }) => {
    return ( 
        <div className={classes.detail}>
            <strong>{heading}</strong>
            <p>{info}</p>
        </div>
     );
}
 
export default PuppyInfo;