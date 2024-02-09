import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
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
  return (
    <DataContext.Provider value={{ flightData }}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider;