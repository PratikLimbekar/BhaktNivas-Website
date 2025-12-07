import './roomdetails.css';
import { useFront } from '../store';
import { useState, useEffect } from 'react';
import axios from "axios";

function RoomDetails() {

    const selectedroom = useFront((state) => state.selectedroom);
    const setSelectedRoom = useFront((state) => state.setSelectedRoom);
    const [assignroom, setAssignRoom] = useState(false);
    const [refresh, setrefresh] = useState(0);
    
    
    function handleAssignRoom() {
        setAssignRoom(true);
    }

    const [roomdetails, setroomdetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/roomdata").then(res => setroomdetails(res.data));
    }, [refresh]);

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
        setSelectedRoom(false);
        setrefresh(prev => prev + 1);
        console.log("Form entry added:", entry);
    };


    if (assignroom && selectedroom) {
    return(
    <>
    <div className='assign-room-card'>
        <div id='room-name'>
            {`Room: ${selectedroom.name}`}
            <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
        </div>
        <div id='assign-room-details'>
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
                    <label htmlFor="amount"> Amount </label><br></br><input type='number' id='amount' name='amount' className='text-input'/><br></br>
                </label>
                <br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </div>
    </>
    );
}

    if (selectedroom) {
        return(
        <>
            <div className='room-card'>
                <div id='room-name'>
                    {`Room: ${selectedroom.name}`}
                    <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
                </div>
                
                <div id='room-details'>
                    Status <br></br>
                    Name <br></br>
                    City <br></br>
                    Mobile <br></br>
                    In-time <br></br>
                    Out-time <br></br>
                    Amount <br></br>
                </div>
                <div className='room-details-buttons'>
                    <button id='assign-room' onClick={() => handleAssignRoom()}> Assign Room </button>
                    <button id='assign-room' onClick={() => handleStatusChange()}> Change Status </button>
                </div>
            </div>
        </>
    );
}
}

export default RoomDetails;