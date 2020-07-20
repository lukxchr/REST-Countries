import React from 'react';
// import logo from './logo.svg';
// import './App.css';

function Navbar(props) {
  return (
      <div className="bg-gray-100 h-16 flex items-center justify-between pl-12 pr-12 sticky top-0">
          <div className="text-xl font-bold text-gray-900">Where in the world?</div>
          <a href="#" className="flex items-center text-gray-800">
            <svg className="inline-block h-4 fill-current" viewBox="0 0 24 24"><path d="M9.57 3.38a8 8 0 0 0 10.4 10.4 1 1 0 0 1 1.31 1.3 10 10 0 1 1-13-13 1 1 0 0 1 1.3 1.3zM7.1 5.04A8 8 0 1 0 18.3 16.27 10 10 0 0 1 7.08 5.04z"/></svg>
            <span>Dark Mode</span> 
          </a>
      </div>
  );
}

function SearchBox(props) {
  return (
    // pl-12 pr-12 mt-4 mb-4 sm:w-full md:w-1/2
    <div className="flex items-center bg-white w-full md:w-1/2">
      <svg className="inline-block h-4 ml-2 flex-shrink-0" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
      <input className="m-2" type="text" placeholder={props.placeholder}/>
    </div>
  );
}

function Filter(props) {
  return (
    <div>
      <select name="region" id="region-filter">
        <option value="" disabled selected hidden>Filter by Region</option>
        <option value="1">one</option>
        <option value="2">two</option>
      </select>
    </div>
  );
}

function CountryCard(props) {
  return (
    <div className="p-8 shadow-2xl rounded overflow-hidden sm:w-full md:w-1/4">
      <div className="rounded overflow-hidden">
        <img className="w-full sm:object-contain md:object-cover md:h-32 " src={props.flagPath} alt={`flag of ${props.name}`}/>
        <div className="bg-gray-200 pl-4 pr-4 pb-2 truncate">
          <div className="">{props.name}</div>
          <div className=""><span>Population: </span>{props.population}</div>
          <div className=""><span>Region: </span>{props.region}</div>
          <div className=""><span>Capital: </span>{props.capital}</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-gray-300 h-screen w-full overflow-scroll">
      <Navbar theme="light"/>
      <div className="flex items-center justify-between flex-wrap pl-12 pr-12 w-full">
        <SearchBox placeholder="Search for a country..."/>
        <Filter />
      </div>
      <div className="flex flex-wrap ml-4 mr-4">
        {placeholder_countries.map(country => 
        <CountryCard 
          name={country.name} 
          population={country.population}
          region={country.region}
          capital={country.capital}
          flagPath={country.flagPath}
        />)}
      </div>
    </div>
  );
}

const placeholder_countries = [
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
  {
    name: 'United States of America',
    population: '323947000',
    region: 'Americas',
    capital: 'Washington D.C.',
    flagPath: 'https://restcountries.eu/data/usa.svg',
  },
  {
    name: 'Germany',
    population: '81770900',
    region: 'Europe',
    capital: 'Berlin',
    flagPath: 'https://restcountries.eu/data/deu.svg',
  },
]

export default App;
