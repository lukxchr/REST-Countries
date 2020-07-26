import React from 'react';
import CountryCard from './CountryCard'

function CountryGallery(props) {
    return (
      <div className="flex flex-wrap ml-4 mr-4">
      {props.countries.map(country =>
        <div className="p-8 sm:w-full md:w-1/4" key={country.code}>
        <CountryCard
          className="flex flex-wrap ml-4 mr-4"
          name={country.name}
          population={country.formattedPopulation}
          region={country.region}
          capital={country.capital}
          flagPath={country.flagPath}
          onClick={() => props.onCardClick(country.code) }
        />
        </div>)
      }
      </div>
    );
}

export default CountryGallery;