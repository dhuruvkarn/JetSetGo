import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import "./Global.css";
import DropDown from '../components/dropdown/DropDown';
import Radio from '../components/radio/Radio';
import Time from '../components/time/Time';
import Travaller from '../components/traveller/Travaller';
import { DataContext } from '../Context/DataContextProvider';
import { useNavigate } from 'react-router-dom';



const BookingPage = () => {
  const { flightData } = useContext(DataContext);
  const navigate = useNavigate();
    
    const [flightInfo, setFlightInfo] = useState({
        way:"oneWay"
    });
      const handleFlightInfo = (key, value) => {
        setFlightInfo({...flightInfo , [value]:key})
      }
  
  const handleRediect = () => {
    navigate('/flight-details');
  }
    
      return (
        <div className='backGroundMainContainer'>
            <div className='mainContainer'>
              {flightData.length === 0 ? "Loading..." :
                <>
                <Radio onSelected={handleFlightInfo} />
                <form className='airportNameContainer'>
                  <DropDown
                    flightInfo={flightInfo}
                    travelSrc="source"
                    onSelected={handleFlightInfo}
                  />
                  <DropDown
                    flightInfo={flightInfo}
                    travelSrc="destination"
                    onSelected={handleFlightInfo}
                  />
                  <Time departStr="Depart-On" onSelected={handleFlightInfo}/>  
                  {flightInfo.way !== "oneWay" && <Time departStr="Return-On" onSelected={handleFlightInfo} />}
                  <Travaller onSelected={handleFlightInfo} />
                  <div onClick={()=>handleRediect()} className='searchContainer'>
                    Search
                  </div>
    
                </form>
                
                </>  
              }
              </div>
        </div>
    );
}

export default BookingPage