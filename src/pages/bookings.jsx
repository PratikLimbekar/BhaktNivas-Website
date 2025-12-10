import './bookings.css';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
    const [bookings, setbookings] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:4000/bookings-data").then(res => setbookings(res.data));
    }, []);
    console.log(bookings);

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
