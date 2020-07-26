import React from 'react';

function Button(props) {
    return (
      <button
        className={`${props.size === 'lg' ? 'h-8 px-8' : 'h-6 w-24 px-2'} 
                    flex items-center justify-center bg-elements shadow 
                    rounded-sm py-1 text-xs font-semibold cursor-pointer 
                    hover:bg-input`}
        title={props.title}
        onClick={props.onClick}
      >
        {props.icon ?? props.icon}
        <div>{props.text}</div>
      </button>
    );
}

export default Button;