import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Context/DataContextProvider';
import toast, { Toaster } from 'react-hot-toast';

const FlightDetails = () => {
  const { flightData } = useContext(DataContext);


const notify = () => toast('Thank You... Your Booking is Confirmed.');
    
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
    const uniqueFlightName = [...new Set(flightData.map(obj => obj.displayData?.airlines[0].airlineName))];
    setFilteredAirLine(uniqueFlightName)
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
    <div className='flightMainContainer'>
       <Toaster />

      {/* render data */}
      <div  className='sortMainContainer'>
      {/* sort by price */}
          <select onChange={handleSortChange} style={{marginBottom:"1rem"}}>
            <option value="--">Sort By price</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>

          {/* filter by airlineName */}
          {filteredAirline.map((airlineName, index) => (
         <label key={index} style={{marginBottom:"0.5rem"}}>
          <input
            type="checkbox"
            value={airlineName}
            checked={selectedAirlines.includes(airlineName)}
            onChange={handleCheckboxChange}
          />
          {airlineName}
        </label>
           ))}
      </div>

      
      <div className='infomainContainer'>

      {sortedFlights.map(({displayData,fare}) => {
              return (
                <div className='flightsubMainContainer'>
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
                      <div>{displayData.totalDuration}</div>
                      
                     <div>-------------</div>
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
             <div  onClick={()=>notify()} className='flightBookMainContainer'>
                <div>Book</div>
           </div>
         </div>
              )
          })}
      </div>
         
      
          
         
    </div>
  )
}

export default FlightDetails;