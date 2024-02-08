import React, { useState } from 'react';
import "./Radio.css";

const Radio = () => {
    const [selectedOption, setSelectedOption] = useState("source");
    const tripWay = [
        {
            key: "One-way",
            value:"source"
        },
        {
            key: "Round Trip",
            value:"destination"
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