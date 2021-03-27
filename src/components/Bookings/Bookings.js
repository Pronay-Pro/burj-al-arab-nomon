import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(() =>{
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('authToken')}`
        }
        })
        .then(response => response.json())
        .then(data => setBookings(data))
    },[])
    return (
        <div>
            <h1>{bookings.length}</h1>
            {
                bookings.map(booking =><li key={booking._id}>{booking.name} from {booking.checkInDate} To {booking.checkOutDate}</li>)
            }
        </div>
    );
};

export default Bookings;