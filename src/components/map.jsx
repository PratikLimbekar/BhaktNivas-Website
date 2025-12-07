import './map.css';
import { useFront } from '../store.js';
import { useState, useEffect } from 'react';
import RoomDetails from './roomdetails.jsx';
import axios from "axios";

function FloorMap() {
    const floor = useFront((state) => state.floor);
    const [horizontal, setHorizontal] = useState(window.innerWidth > window.innerHeight);
    const setSelectedRoom = useFront((state) => state.setSelectedRoom);
    const selectedroom = useFront((state) => state.selectedroom);

    const [roomdetails, setroomdetails] = useState([]);

    const statusColors = {
        PERSONAL_USE: "#4c4cffff",
        OCCUPIED: "#f95547ff",
        FREE: "#0aec55ff",
        DEFAULT: "#D9D9D9"
    };

    const getRoomStatus = (roomID) => {
        const number = roomID;
        const dbRoom = roomdetails.find(
            r => r.room_number === number
        );

        return dbRoom ? dbRoom.status : "DEFAULT";
    }

    useEffect(() => {
        axios.get("http://localhost:4000/roomdata").then(res => setroomdetails(res.data));
    }, []);

    useEffect(() => {
        function handleResize() {
            setHorizontal(window.innerWidth > window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const rotateClass = horizontal ? "rotate-map" : "svg";

    const roomsFloor1 = [
        
        { id: "Parking", name: "Parking", path: "M325 390H193V471H325V390Z", x: 193, y: 390, width: 132, height: 81 },
        { id: "Office", name: "Office", path: "M189 454H131V483H189V454Z", x: 131, y: 454, width: 58, height: 29 },
        { id: "r2", name: "2", path: "M189 406H131V450H189V406Z", x: 131, y: 406, width: 58, height: 44 },
        { id: "r3", name: "3", path: "M189 354H99V398H189V354Z", x: 99, y: 354, width: 90, height: 44 },
        { id: "r4", name: "4", path: "M189 309H99V351H189V309Z", x: 99, y: 309, width: 90, height: 42 },
        { id: "Courtyard", name: "Courtyard", path: "M325 250H195V385H325V250Z", x: 195, y: 250, width: 130, height: 135 },
        { id: "Washroom", name: "Washroom", path: "M188 274H99V297H188V274Z", x: 99, y: 274, width: 89, height: 23 },
        { id: "r5", name: "5", path: "M188 210H99V269H188V210Z", x: 99, y: 210, width: 89, height: 59 },
        { id: "r6", name: "6", path: "M189 133H100V192H189V133Z", x: 100, y: 133, width: 89, height: 59 },
        { id: "r7", name: "7", path: "M307 133H218V192H307V133Z", x: 218, y: 133, width: 89, height: 59 },
        { id: "r8", name: "8", path: "M307 60H218V119H307V60Z", x: 218, y: 60, width: 89, height: 59 },
        { id: "r9", name: "9", path: "M188 60H99V119H188V60Z", x: 99, y: 60, width: 89, height: 59 },
    ];

    const roomsFloor2 = [
        { id: "r10", name: "10", x: 102, y: 315, width: 89, height: 59 },
        { id: "r13", name: "13", x: 220, y: 315, width: 89, height: 59 },
        { id: "r14", name: "14", x: 220, y: 242, width: 89, height: 59 },
        { id: "r11", name: "11", x: 101, y: 242, width: 89, height: 59 },
        { id: "r15", name: "15", x: 220, y: 169, width: 89, height: 59 },
        { id: "r12", name: "12", x: 101, y: 169, width: 89, height: 59 },
    ];

    const centerX = (r) => r.x + r.width / 2;
    const centerY = (r) => r.y + r.height / 2;

    if (floor) {
        return (
            <>
            {selectedroom && <RoomDetails></RoomDetails>}
            <div className={`first-two ${rotateClass}`}>
                <svg width="95vw" height="95vh" viewBox="0 0 409 544" fill="none" xmlns="http://www.w3.org/2000/svg">
                    
                    {roomsFloor1.map(room => (
                        <g key={room.id}>
                            <path
                                d={room.path}
                                fill={statusColors[getRoomStatus(room.name)] || "#D9D9D9"}
                                onClick={() => setSelectedRoom(room)}
                                cursor={'pointer'}
                            />
                            {/* Room label */}
                            <text
                                x={centerX(room)}
                                y={centerY(room)}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="15px"
                                fill="black"
                                pointerEvents="none"
                            >
                                {room.name}
                            </text>
                        </g>
                    ))}

                    <defs>
                        <clipPath id="clip0_4_48">
                            <rect width="409" height="544" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            </>
        );
    }

    return (
        <>
        
        <div className={`third ${rotateClass}`}>
            <svg width="95vw" height="95vh" viewBox="0 0 409 544" fill="none" xmlns="http://www.w3.org/2000/svg">
                {roomsFloor2.map(room => (
                    <g key={room.id}>
                        <rect
                            x={room.x}
                            y={room.y}
                            width={room.width}
                            height={room.height}
                            fill={statusColors[getRoomStatus(room.name)] || "#D9D9D9"}
                            onClick={() => setSelectedRoom(room)}
                            cursor={'pointer'}
                        />
                        <text
                            x={centerX(room)}
                            y={centerY(room)}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="18"
                            fill="black"
                            pointerEvents="none"
                        >
                            {room.name}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
        </>
    );
}

export default FloorMap;
