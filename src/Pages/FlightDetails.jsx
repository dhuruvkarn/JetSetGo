import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FlightDetails = () => {
    const [flightData, setFlightData] = useState([]);
    useEffect(() => {
        axios.get("https://api.npoint.io/4829d4ab0e96bfab50e7")
            .then(({ data }) => {
                // const uniqueFlightName = [...new Set(data.data.result.map(obj => obj.displayData?.airlines[0].airlineName))];
                // setFilterByFlight(uniqueFlightName)
                setFlightData(data.data.result)
                
          })
          .catch((err) => {
          console.log(err.message)
        })
    }, []);
    
    console.log(flightData, "flightDataline")
    
 
    
   
    
  return (
      <div>
          {/*  */}
          {flightData.map(({displayData,fare}) => {
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