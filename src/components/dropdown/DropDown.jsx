import React, { useEffect, useState } from 'react';
import "./DropDown.css";

const DropDown = ({ flightData, travelSrc,flightInfo,onSelected }) => {
  const [text, setText] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [mapingData, setMapingData] = useState([]);

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
            <i>
              <img src="https://d3tfanr7troppj.cloudfront.net/static_files/images/000/004/711/original/Departure.svg?1697539770" />
            </i>
          
            <input className='dropDownInputContainer'
              type='text'
            value={flightInfo[travelSrc] || ""}
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