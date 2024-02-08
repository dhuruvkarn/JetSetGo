import React, { useState } from 'react';
import "./Radio.css";

const Radio = () => {
    const [selectedOption, setSelectedOption] = useState("one");
    const tripWay = [
        {
            key: "One-way",
            value:"one"
        },
        {
            key: "Round Trip",
            value:"round"
        }
    ];

    const handleOptionChange = ({value}) => {
        setSelectedOption(value);
    };
    
  return (
      <div className='radionMainContainer'>
        {tripWay.map((option, index) => (
        <div key={index}>
            <input
                type="radio"
                checked={selectedOption === option.value}
                onChange={() => handleOptionChange(option)}
            />
                           
            {option.key}
        </div>
      ))}

    </div>
  )
}

export default Radio;