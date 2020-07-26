import React, {useState} from 'react';

import {ReactComponent as DownArrowIcon} from '../assets/images/icon-arrow-down.svg';


function Filter(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function selectOption(option) {
      //represent All option as null
      if (option ===  props.showAllName) option = null;
      //if selected option is the same as already selected
      //still close the dropdown but don't update state/call onChange callback
      setIsOpen(false);
      if (option !== selectedOption) {
        setSelectedOption(option);
        props.onChange(option);
      }
    }

    return (
      <div className="relative w-40 text-sm font-semibold text-gray-800
                      shadow tracking-tight cursor-pointer">
        <div>
          <div
            className="bg-elements flex items-center justify-between h-12
                       rounded p-4 bg-white hover:bg-input"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption ? selectedOption : props.placeholder}
            <DownArrowIcon className="h-2 ml-6 fill-current"/>
          </div>
        </div>
        {isOpen &&
          <div className="bg-elements absolute mt-1 w-full bg-white rounded shadow">
            {[props.showAllName, ...props.options].map(option =>
             <span
              key={option}
              className="block px-2 py-1 hover:bg-input"
              onClick={() => selectOption(option)}
            >{option}</span>)
            }
          </div>
        }
      </div>
    );
}

export default Filter;