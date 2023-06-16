import { Link, NavLink } from 'react-router-dom'
import classes from './MainNavigation.module.scss'
import svgLogo from '../../assets/images/paw-logo.svg'

const MainNavigation = () => {
    return ( 
        <header className={classes.header}>
            <div className='app-container'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/' className={`font-semibold ${classes.logo}`}>
                                <img src={svgLogo} alt="Adopt A Puppy" />
                                Adopt A Puppy
                            </Link>
                        </li>
                        <li><NavLink to='find-your-puppy' className={(({isActive}) => isActive ? classes.active : null)}>Find your puppy</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
 
export default MainNavigation;