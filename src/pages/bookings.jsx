import './bookings.css';
import Navbar from '../components/navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
    const [bookings, setbookings] = useState([]);
    const [currentroom, setcurrentroom] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:4000/bookings-data").then(res => setbookings(res.data));
    }, []);
    console.log(bookings);

    function handleClick(room) {
        setcurrentroom(room);
    }

    if (currentroom) {
        return(
            <div className='booking-detail'>
                <div className='room-card'>
                <div id='room-name'>
                    {`Entry: ${currentroom.id}`}
                    <button onClick={() => setcurrentroom(null)} style={{"marginLeft": "auto"}}> X </button>
                </div>
                
                <div id='room-details'>
                    <b>Stayed at:</b> Room {currentroom.Room?.room_number}<br></br>
                    <b>Name:</b> {currentroom.Guest?.name} <br></br>
                    <b>City: </b>{currentroom.Guest?.city} <br></br>
                    <b>Mobile: </b>{currentroom.Guest?.mobile} <br></br>
                    <b>In-time: </b>{new Date(currentroom.checkin_date).toLocaleString()} <br></br>
                    <b>Out-time:</b> {new Date(currentroom.checkout_date).toLocaleString()} <br></br>
                    <b>Amount: </b>{currentroom.amount} <br></br>
                </div>
            </div>
            </div>
        );
    }

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
                {bookings.map(booking => (
                    <div className='booking-single' key={booking.id} onClick={() => handleClick(booking)}>
                        <div id='room-number'>
                        {booking.Room?.room_number}</div>
                        <div id='middle'>
                        {booking.Guest?.name}<br></br>
                        <>{new Date(booking.checkin_date).toLocaleString()} - {new Date(booking.checkout_date).toLocaleString()}</>
                        </div>
                        <div id='amount'>
                        {booking.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;
