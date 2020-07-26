import React from 'react';
import Button from './Button'
import {ReactComponent as LeftArrowIcon} from '../assets/images/icon-arrow-left.svg';

function DetailModal(props) {
  return (
    <div className="fixed bg-primary inset-0 mt-16 px-12 py-8 overflow-scroll">
      <Button
        size='lg'
        text='Back'
        icon={<LeftArrowIcon className="h-3 mr-1 fill-current"/>}
        onClick={props.onBackClick}
      />
      <div className="md:flex md:flex-wrap">
        <div className="relative pb-2/3 md:pb-1/3 mt-16 w-full md:w-1/2">
          <img
              className="absolute h-full w-full object-cover shadow"
              src={props.country.flagPath}
              alt={`flag of ${props.country.name}`}
          />
        </div>
        <div className="md:w-1/2 md:flex md:flex-wrap md:mt-12 md:pl-16">
          <div className="text-lg font-bold mt-10 md:w-full md:text-2xl">{props.country.name}</div>
          <div className="mt-6 md:w-1/2">
            <div><span className="label">Native Name: </span>{props.country.name}</div>
            <div><span className="label">Population: </span>{props.country.formattedPopulation}</div>
            <div><span className="label">Region: </span>{props.country.region}</div>
            <div><span className="label">Sub Region: </span>{props.country.subregion}</div>
            <div><span className="label">Capital: </span>{props.country.capital}</div>
          </div>
          <div className="mt-6 md:w-1/2 md:pl-8">
            <div><span className="label">Top Level Domain: </span>{props.country.topLevelDomains}</div>
            <div>
              <span className="label">Currencies: </span>
              {props.country.currencies.map(cur => cur.name).join(', ')}
            </div>
            <div>
              <span className="label">Languages: </span>
              {props.country.languages.map(lang => lang.name).join(', ')}</div>
          </div>
          {props.country.borderingCountries.length > 0 && <div className="mb-16">
            <div className="font-semibold mt-6 mb-2 md:mb-1">Border Countries: </div>
            <div className="flex flex-wrap">
              {props.country.borderingCountries.map(bc =>
                <div className="m-1" key={bc.code}>
                  <Button
                    text={bc.name.length < 12 ? bc.name : bc.code}
                    title={bc.name}
                    onClick={() => props.onBorderingCountryClick(bc.code)}
                  />
                </div>)}
              </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default DetailModal;