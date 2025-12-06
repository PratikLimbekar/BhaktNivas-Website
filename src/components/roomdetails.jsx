import './roomdetails.css';
import { useFront } from '../store';
import { useState, useEffect } from 'react';
import axios from "axios";

function RoomDetails() {

    const selectedroom = useFront((state) => state.selectedroom);
    const setSelectedRoom = useFront((state) => state.setSelectedRoom);
    const [assignroom, setAssignRoom] = useState(false);
    
    function handleAssignRoom() {
        setAssignRoom(true);
        // setSelectedRoom(null);
    }

    const [roomdetails, setroomdetails] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/roomdata").then(res => setroomdetails(res.data));
    }, []);

    function handleSubmit() {
        
    }

    if (assignroom && selectedroom) {
    return(
    <>
    <div className='assign-room-card'>
        <div id='room-name'>
            {`Room: ${selectedroom.name}`}
            <button onClick={() => setSelectedRoom(null)} style={{"marginLeft": "auto"}}> X </button>
        </div>
        <div id='assign-room-details'>
            <form id='assign-form'>
                <label>
                    <span>Status <input type='radio' className='status-input' id='Occupied' name="status" value = 'Occupied'/><label for="Occupied">Occupied</label>
                    <input type='radio' id='Free' name="status" value = 'Free'/><label for="Free"> Free </label>
                    <input type='radio' id='Personal Use' name="status" value = 'Personal Use'/><label for="Personal Use">Personal Use</label>
                    </span><br></br>
                    <label for="name">Name: </label><br></br><input type='text' className='text-input' id='name' name='name'/><br></br>
                    <label for="City">City: </label><br></br><input type='text' id='city' className='text-input' name='city'/><br></br>
                    <label for="Intime">In-Time: </label><br></br><input type='datetime-local' id='intime' className='text-input' name='Intime'/><br></br>
                    <label for="Outtime">Out-Time: </label><br></br><input type='datetime-local' id='outtime' name='Outtime' className='text-input'/><br></br>
                    <label for="amount"> Amount </label><br></br><input type='number' id='amount' name='amount' className='text-input'/><br></br>
                </label>
                <br></br>
                <button type='submit' onClick={handleSubmit()}>Submit</button>
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
                <button id='assign-room' onClick={() => handleAssignRoom()}> Assign Room </button>
            </div>
        </>
    );
}
}

export default RoomDetails;