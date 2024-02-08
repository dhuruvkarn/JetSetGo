import React, { useState } from 'react';
import "./Radio.css";

const Radio = ({onSelected}) => {
    const [selectedOption, setSelectedOption] = useState("oneWay");
    const tripWay = [
        {
            key: "One-way",
            value:"oneWay"
        },
        {
            key: "Round Trip",
            value:"roundWay"
        }
    ];

    const handleOptionChange = ({value}) => {
        setSelectedOption(value);
        onSelected(value, "way")
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