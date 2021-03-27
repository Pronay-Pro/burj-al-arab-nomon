import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
//   KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from "@material-ui/core";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [selectedDate, setSelectedDate] = useState({
      checkInDate : new Date(),
      checkOutDate : new Date(),
  });

  const handleCheckInDate= (date) => {
      const newDate = {...setSelectedDate}
      newDate.checkInDate = date
    setSelectedDate(newDate);
  };
  const handleCheckOutDate= (date) => {
      const newDate = {...setSelectedDate}
      newDate.checkOutDate = date
    setSelectedDate(newDate);
  };

  const handleBooking =()=>{
      const booking = {...loggedInUser, ...selectedDate}
      fetch(`http://localhost:5000/addBooking`,{
          method: 'POST',
          headers : { 'Content-Type' : 'application/json'},
          body : JSON.stringify(booking)
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
      })
  }




  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        hello {loggedInUser.name}! Let's book a {bedType} Room.
      </h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Check In Date"
            value={selectedDate.checkInDate}
            onChange={handleCheckInDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="MM/dd/yyyy"
            value={selectedDate.checkOutDate}
            onChange={handleCheckOutDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          {/* <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDate}
            KeyboardButtonProps={{
              "aria-label": "change time",
            }}
          /> */}
        </Grid>
        <Button onClick={handleBooking} variant="contained" color="secondary">Book Now</Button>
      </MuiPickersUtilsProvider>
      <Bookings></Bookings>
    </div>
    
  );
};

export default Book;
