import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FlightDetails = () => {
    const [flightData, setFlightData] = useState([]);
    // price render
    const [sortOption, setSortOption] = useState('--');
    const [sortedFlights, setSortedFlights] = useState(flightData);

    //  filter by airline name
    const [filteredAirline , setFilteredAirLine] = useState([])
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
          setSelectedAirlines([...selectedAirlines, value]);
        } else {
          setSelectedAirlines(selectedAirlines.filter((airline) => airline !== value));
        }
      };
    

    useEffect(() => {
        if (selectedAirlines.length === 0) {
            setSortedFlights(flightData);
        } else {
            setSortedFlights(flightData.filter((item) => item.displayData.airlines.some(airline => selectedAirlines.includes(airline.airlineName))));
        }
      }, [flightData, selectedAirlines]);
  

//   
    useEffect(() => {
        axios.get("https://api.npoint.io/4829d4ab0e96bfab50e7")
            .then(({ data }) => {
                const uniqueFlightName = [...new Set(data.data.result.map(obj => obj.displayData?.airlines[0].airlineName))];
                setFilteredAirLine(uniqueFlightName)
                setFlightData(data.data.result)
                
          })
          .catch((err) => {
          console.log(err.message)
        })
    }, []);
    
    // price filter
    useEffect(() => {
      sortFlights();
    }, [sortOption, flightData]);
  
    const sortFlights = () => {
      let sorted = [...flightData];
  
      if (sortOption === 'low') {
        sorted.sort((a, b) => a.fare - b.fare);
      } else if (sortOption === 'high') {
        sorted.sort((a, b) => b.fare - a.fare);
      }

      setSortedFlights(sorted);
    };
  
    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    };


    
  return (
      <div>
          {/* sort by price */}
          <select onChange={handleSortChange}>
            <option value="--">Sort By price</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>

          {/* filter by airlineName */}
          {filteredAirline.map((airlineName, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={airlineName}
            checked={selectedAirlines.includes(airlineName)}
            onChange={handleCheckboxChange}
          />
          {airlineName}
        </label>
      ))}

          


          {/* render data */}
          {sortedFlights.map(({displayData,fare}) => {
              return (
                <div className='flightMainContainer'>
                {/* first */}
                   <div className='imgMainContainer'>
                   <div>
                            <div>{ displayData.airlines[0].airlineName}</div>
                              <div>{displayData.airlines[0].airlineCode} - {displayData.airlines[0].flightNumber}</div>
                   </div>
                   </div>
           {/* second  */}
             <div className='flightTimeContainer'>
                          <div className='time'>{new Date(displayData.source.depTime).getHours()} : {new Date(displayData.source.depTime).getMinutes()} </div>
                 <div className='stop'>
                    <div>{ displayData.totalDuration}</div>
                     <div>---------------</div>
                    <div>{ displayData.stopInfo}</div>
                 </div>
                          <div className='time'>
                              {new Date(displayData.destination.arrTime).getHours()} : {new Date(displayData.destination.arrTime).getMinutes()}
                 </div>
             </div>
             
             {/* third */}
             <div className='priceMainContainer'>
                ₹{fare}
             </div>

             {/* four */}
             <div className='flightBookMainContainer'>
                <div>Book</div>
           </div>
         </div>
              )
          })}
         
    </div>
  )
}

export default FlightDetails;