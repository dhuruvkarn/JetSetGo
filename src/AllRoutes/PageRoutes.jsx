import React from 'react'
import { Routes, Route } from "react-router-dom"
import BookingPage from '../Pages/BookingPage';
import FlightDetails from '../Pages/FlightDetails';

function PageRoutes() {
  return (
    <div>
          <Routes>
        <Route path='/' element={<BookingPage />}></Route>
        <Route path='/flight-details' element={<FlightDetails/>}></Route>
          </Routes>
    </div>
  )
}

export default PageRoutes