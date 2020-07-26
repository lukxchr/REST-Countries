import React from 'react';
import {ReactComponent as SearchIcon} from '../assets/images/icon-search.svg';

function SearchBox(props) {
    return (
      <div className="flex items-center bg-elements shadow pl-4 w-full h-12 rounded md:w-1/3">
        <SearchIcon className="inline-block h-4 ml-2 flex-shrink-0 fill-current"/>
        <input
          className="bg-elements m-2 w-full font-semibold focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          onChange={e => props.onChange(e.target.value)}
        />
      </div>
    );
}

export default SearchBox;