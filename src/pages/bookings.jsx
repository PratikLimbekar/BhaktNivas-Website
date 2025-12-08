import './bookings.css';
import Navbar from '../components/navbar';
function Bookings() {
    return(
        <div id='bookings-page'>
            <Navbar></Navbar>
            <div id='page-title'>
                Bookings
            </div>
            <div id='filter-pane'>
                Filters
            </div>
            <div id='bookings-list'>
                List
            </div>
        </div>
    );
}

export default Bookings;
