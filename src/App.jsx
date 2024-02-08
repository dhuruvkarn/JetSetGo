import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import DropDown from './components/dropdown/DropDown';
import Radio from './components/radio/Radio';
import Time from './components/time/Time';
import Travaller from './components/traveller/Travaller';

function App() {
  const [flightInfo, setFlightInfo] = useState({
    way:"oneWay"
  });
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    axios.get("https://api.npoint.io/4829d4ab0e96bfab50e7")
      .then(({data}) => {
        setFlightData(data.data.result)
      })
      .catch((err) => {
      console.log(err.message)
    })
  }, []);

  const handleFlightInfo = (key, value) => {
    setFlightInfo({...flightInfo , [value]:key})
  }
  console.log(flightInfo,"flightInfoline")

  return (
    <div className='backGroundMainContainer'>
        <div className='mainContainer'>
          {flightData.length === 0 ? "Loading..." :
            <>
            <Radio onSelected={handleFlightInfo} />
            <form className='airportNameContainer'>
              <DropDown
                flightData={flightData}
                flightInfo={flightInfo}
                travelSrc="source"
                onSelected={handleFlightInfo}
              />
              <DropDown
                flightData={flightData}
                flightInfo={flightInfo}
                travelSrc="destination"
                onSelected={handleFlightInfo}
              />
              <Time departStr="Depart-On" onSelected={handleFlightInfo}/>  
              {flightInfo.way !== "oneWay" && <Time departStr="Return-On" onSelected={handleFlightInfo} />}
              <Travaller onSelected={handleFlightInfo} />
              <div className='searchContainer'>
                Search
              </div>
            </form>

            </>  
          }
          </div>
    </div>
  );
}

export default App;
