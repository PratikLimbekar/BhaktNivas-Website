//TODO:
// i want to recommend values that already exist in the database as
//  a quick selection type thing. For ex, if a guy has already booked 
// a room sometime ago (ie he is in the database), his name should be 
// suggested as a quick autocomplete. guide me step by step on how to 
// implement that.


import './roomdetails.css';
import { useFront } from '../store';
import { useState, useEffect } from 'react';
import axios from "axios";

function RoomDetails() {

    const selectedroom = useFront((state) => state.selectedroom);
    const setSelectedRoom = useFront((state) => state.setSelectedRoom);
    const [assignroom, setAssignRoom] = useState(false);
    const [refresh, setrefresh] = useState(0);
    const [changestatus, setChangeStatus] = useState(false);
    var currentroom = 13;

    
    
    function handleAssignRoom() {
        setAssignRoom(true);
    }
    function toggleChangeStatus() {
        setChangeStatus(true);
    }

    const [roomdetails, setroomdetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/bookings-data").then(res => setroomdetails(res.data));
    }, [refresh]);

    async function handleStatusChange (e) {
        e.preventDefault();
        const formstatus = document.getElementById("form-change");
        const statusformdata = new FormData(formstatus);

        const newstatus = {
            status: statusformdata.get('status'),
            room: Number(selectedroom?.name) + 1
        }

        try {
            const res = await axios.post("http://localhost:4000/set-status", newstatus);
            console.log("Status changed", res.data);
        } catch (err) {
            console.error("Failed:", err.response?.data || err.message);
            alert("Failed to change status");
        }
        setAssignRoom(false);
        setrefresh(prev => prev + 1);
        setSelectedRoom(null);
    }

    async function handleSubmit  (e) {
        e.preventDefault(); //stop page reload

        const formElement = document.getElementById("assign-form");
        const formData = new FormData(formElement);

        const entry = {
            status: formData.get('status'),
            name: formData.get('name'),
            city: formData.get('city'),
            Mobile: formData.get('number'),
            Intime: formData.get('Intime'),
            Outtime: formData.get('Outtime'),
            amount: Number(formData.get('amount')),
            room: Number(selectedroom?.name) + 1
        };

        try {
            const res = await axios.post("http://localhost:4000/book", entry);
            console.log("Booking saved:", res.data);
        } catch (err) {
            console.error("Failed:", err.response?.data || err.message);
            alert("Failed to save booking");
        }

        setAssignRoom(false);
        setSelectedRoom(null);
        setrefresh(prev => prev + 1);
        console.log("Form entry added:", entry);
    };


    if (assignroom && selectedroom) {
    return(
    <>
    <div className='room-card'>
        <div id='room-name'>
            {`Room: ${selectedroom.name}`}
            <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
        </div>
        <div id='room-details'>
            <form id='assign-form' onSubmit={handleSubmit}>
                <label>
                    <span>Status <input type='radio' className='status-input' id='Occupied' name="status" value = 'Occupied'/><label htmlFor="Occupied">Occupied</label>
                    <input type='radio' id='Free' name="status" value = 'Free'/><label htmlFor="Free"> Free </label>
                    <input type='radio' id='Personal Use' name="status" value = 'Personal Use'/><label htmlFor="Personal Use">Personal Use</label>
                    </span><br></br>
                    <label htmlFor="name">Name: </label><br></br><input type='text' className='text-input' id='name' name='name'/><br></br>
                    <label htmlFor="name">Mobile: </label><br></br><input type='text' className='text-input' id='number' name='number'/><br></br>
                    <label htmlFor="City">City: </label><br></br><input type='text' id='city' className='text-input' name='city'/><br></br>
                    <label htmlFor="Intime">In-Time: </label><br></br><input type='datetime-local' id='intime' className='text-input' name='Intime'/><br></br>
                    <label htmlFor="Outtime">Out-Time: </label><br></br><input type='datetime-local' id='outtime' name='Outtime' className='text-input'/><br></br>
                    <label htmlFor="amount"> Amount: </label><br></br><input type='number' id='amount' name='amount' className='text-input'/><br></br>
                </label>
                <br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
    </>
    );
}

    if (changestatus && selectedroom) {
        return(
        <>
        <div className='room-card'>
            <div id='room-name'>
                {`Room: ${selectedroom.name}`}
                    <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
            </div>
            <br></br>
            <br></br>
            <div className='set-status'>
            <form id='form-change' onSubmit={handleStatusChange}>
            <span>
            Status: <br></br><br></br>
            <input type='radio' id='Free' name="status" value = 'Free'/><label htmlFor="Free"> Free </label>
            <input type='radio' id='Personal Use' name="status" value = 'Personal Use'/><label htmlFor="Personal Use">Personal Use</label>
            </span><br></br><br></br>
            <button type='submit'>Change Status</button>
            </form>
        </div>
        </div>
        
        </>
        );
    }

    if (selectedroom) {
        // useEffect(() => {
        //     axios.get("http://localhost:4000/get-room-data/current?roomid=id").then(res =>setcurrentroom(res.data))
        // }, []);
        return(
        <>
            <div className='room-card'>
                <div id='room-name'>
                    {`Room: ${selectedroom.name}`}
                    <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
                </div>
                
                <div id='room-details'>
                    Stayed at: Room {currentroom.Room?.room_number}<br></br>
                    Name: {currentroom.Guest?.name} <br></br>
                    City: {currentroom.Guest?.city} <br></br>
                    Mobile: {currentroom.Guest?.mobile} <br></br>
                    In-time: {currentroom.checkin_date} <br></br>
                    Out-time: {currentroom.checkout_date} <br></br>
                    Amount: {currentroom.amount} <br></br>
                </div>
                <div className='room-details-buttons'>
                    <button id='assign-room' onClick={() => handleAssignRoom()}> Assign Room </button>
                    <button id='change-status' onClick={() => toggleChangeStatus()}> Change Status </button>
                </div>
            </div>
        </>
    );
}

    
}

export default RoomDetails;

