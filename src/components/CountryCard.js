import React from 'react';

function CountryCard(props) {
    return (
      <div className="bg-elements rounded shadow overflow-hidden" onClick={props.onClick}>
        <img
          className="w-full sm:object-contain md:object-cover md:h-32"
          src={props.flagPath}
          alt={`flag of ${props.name}`}
        />
        <div className="bg-gray-200 pl-4 pr-4 pb-8 pt-6 text-gray-800">
          <div className="truncate mb-4 font-bold">{props.name}</div>
          <div className="truncate"><span className="label">Population: </span>{props.population}</div>
          <div className="truncate"><span className="label">Region: </span>{props.region}</div>
          <div className="truncate"><span className="label">Capital: </span>{props.capital}</div>
        </div>
      </div>
    );
  }

  export default CountryCard;