import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import DropDown from './components/dropdown/DropDown';
import Radio from './components/radio/Radio';

function App() {
  const [flightInfo , setFlightInfo] = useState({})
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

  const handleFlightInfo = (key , value) => {
    setFlightInfo({...flightInfo , [value]:key})
  }

  return (
    <div className='mainContainer'>
        <>
          {flightData.length === 0 ? "Loading..." :
            <>
            <Radio />
            <div className='airportNameContainer'>
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
            </div>

            </>  
          }
          </>
    </div>
  );
}

export default App;
