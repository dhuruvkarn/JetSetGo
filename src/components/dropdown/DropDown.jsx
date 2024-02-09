import React, { useContext, useEffect, useState } from 'react';
import "./DropDown.css";
import { DataContext } from '../../Context/DataContextProvider';

const DropDown = ({  travelSrc, flightInfo, onSelected }) => {
  const { flightData } = useContext(DataContext);
  const [text, setText] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [mapingData, setMapingData] = useState([]);
  const source = "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/004/711/original/Departure.svg?1697539770";
  const destination = "https://d3tfanr7troppj.cloudfront.net/static_files/images/000/004/710/original/Destination.svg?1697539753"

  const handlechange = (e) => {
    setText(e.target.value);
  }

  useEffect(() => {
    const filteredData = flightData.filter(obj => {
      const sourceAirport = obj?.displayData?.[travelSrc]?.airport;
      const cityCodeMatch = sourceAirport.cityCode.toLowerCase().includes(text.toLowerCase());
      const cityNameMatch = sourceAirport.cityName.toLowerCase().includes(text);
      const airportNameMatch = sourceAirport.airportName.toLowerCase().includes(text);
      return cityCodeMatch || cityNameMatch || airportNameMatch;
    });

    const uniqueAirportNames = [...new Set(filteredData.map(obj => obj.displayData?.source?.airport?.airportName))];
    setMapingData(uniqueAirportNames);
  }, [text])

  const handleHide = (value,key) => {
    onSelected(value,key)
    setShowDropDown(false)
  }


  return (
    <>
     <div className="dropDownMainContainer">
        <div className='inputImgContainer'
         onMouseEnter={() => setShowDropDown(true)}
         onMouseLeave={() => setShowDropDown(false)}
        >
            <i style={{marginLeft:"10px"}}>
              <img src={travelSrc === "source" ? source : destination} />
            </i>
          
            <input className='dropDownInputContainer'
              type='text'
            value={flightInfo[travelSrc] || text}
              placeholder={travelSrc === "source" ? "From" : "To"}
             onChange={(e) => handlechange(e)}
              autoComplete='off'
          />
        </div>
          {showDropDown && 
          <div className='optionMainContainer'>
            {mapingData?.map((elem) => {
              return (
                <div className='optionContainer'
                onMouseEnter={() => setShowDropDown(true)}
                  onMouseLeave={() => setShowDropDown(false)}
                  onClick={()=>handleHide(elem,travelSrc)}
                >
                  {elem}
                </div>
              )
            })}
        </div>
        }
      </div>
    </>
  )
}

export default DropDown;