import React from 'react';

import {ReactComponent as CrescentIcon} from '../assets/images/icon-crescent.svg';


function Navbar(props) {
    return (
        <div className="bg-elements shadow h-16 flex items-center justify-between pl-12 pr-12 sticky top-0 z-10">
            <div className="text-xl font-bold">{props.title}</div>
            <button className="flex items-center focus:outline-none" onClick={props.onThemeSwitch}>
              <CrescentIcon className="h-4 fill-current"/>
              <span className="ml-1 font-semibold tracking-tight text-xs">Dark Mode</span>
            </button>
        </div>
    );
}

export default Navbar;
