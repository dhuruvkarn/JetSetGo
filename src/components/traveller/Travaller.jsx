import React, { useState } from 'react';
import "./Travaller.css";

const Travaller = ({onSelected}) => {
    const [num , setNum] = useState("")

    const handleTraveller = (e) => {
        const check = e.target.value;
        if (!isNaN(check)) {
            setNum(check)
            onSelected(Number(check) , "number_of_people")
        } else {
            setNum("");
        }        
    }

  return (
      <div className='travallerMainContainer'>
          <input
              type="text"
              minLength={1}
              maxLength={1}
              value={num}
              placeholder='No. of People'
              onChange={(e) => handleTraveller(e)}
          />
    </div>
  )
}

export default Travaller;