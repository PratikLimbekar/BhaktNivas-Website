import './home.css';
import FloorMap from '../components/map';
import { useFront } from '../store';
import RoomDetails from '../components/roomdetails';
import Navbar from '../components/navbar';


function Home() {
    const toggleFloor = useFront((state) => state.setFloor);
    const selectedroom = useFront((state) => state.selectedroom);
    return(
        <>
        <Navbar></Navbar>
        <div className='home'>
            <button id='floor-toggle' onClick={toggleFloor}>Floor toggle </button>
            <FloorMap></FloorMap>
        </div>
        <div>
            {selectedroom && <RoomDetails></RoomDetails>}
        </div>
        </>
    );
}

export default Home;