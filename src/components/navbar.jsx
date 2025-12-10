import './navbar.css';
import { Link } from 'react-router';

function Navbar() {
    return(
        <div id='navbar'>
            <div className='logo'>
                Bhaktnivas
            </div>
            <div className='links'>
               <ul>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/bookings'><li>Bookings</li></Link>
                    </ul> 
            </div>
        </div>
    );
}

export default Navbar;