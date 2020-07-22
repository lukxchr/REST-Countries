import React, {useState, useEffect} from 'react';

function Navbar(props) {
  return (
      <div className="bg-elements shadow h-16 flex items-center justify-between pl-12 pr-12 sticky top-0 z-10">
          <div className="text-xl font-bold">{props.title}</div>
          <a href="#" className="flex items-center" onClick={props.onThemeSwitch}>
            <svg className="inline-block h-4 fill-current" viewBox="0 0 24 24"><path d="M9.57 3.38a8 8 0 0 0 10.4 10.4 1 1 0 0 1 1.31 1.3 10 10 0 1 1-13-13 1 1 0 0 1 1.3 1.3zM7.1 5.04A8 8 0 1 0 18.3 16.27 10 10 0 0 1 7.08 5.04z"/></svg>
            <span className="ml-1 font-semibold tracking-tight text-xs">Dark Mode</span>
          </a>
      </div>
  );
}

function SearchBox(props) {
  return (
    <div className="flex items-center bg-elements shadow pl-4 w-full h-12 rounded md:w-1/3">
      <svg className="inline-block h-4 ml-2 flex-shrink-0 fill-current" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
      <input 
        className="bg-elements m-2 w-full font-semibold focus:outline-none" 
        type="text" 
        placeholder={props.placeholder}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
}

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
    <div className="relative w-40 text-sm font-semibold text-gray-800 shadow tracking-tight cursor-pointer">
      <div>
        <div className="bg-elements flex items-center justify-between h-12 rounded p-4 bg-white" onClick={() => setIsOpen(!isOpen)}>
          {selectedOption ? selectedOption : props.placeholder}
        <svg className="h-2 ml-6 fill-current" viewBox="0 0 491.996 491.996"><path d="M484.132 124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z"/></svg>
        </div>
      </div>
      {isOpen && 
        <div className="bg-elements absolute mt-1 w-full bg-white rounded shadow">
          {[props.showAllName, ...props.options].map(option => 
           <span 
            key={option}
            className="block px-2 py-1 hover:bg-primary" 
            onClick={() => selectOption(option)}
          >{option}</span>)
          }
        </div>
      }
    </div>
  );
}

function CountryCard(props) {
  return (
    <div className="p-8 sm:w-full md:w-1/4">
      <div className="bg-elements rounded overflow-hidden shadow" onClick={props.onClick}>
        <img className="w-full sm:object-contain md:object-cover md:h-32 " src={props.flagPath} alt={`flag of ${props.name}`}/>
        <div className="bg-gray-200 pl-4 pr-4 pb-8 pt-6 truncate text-gray-800">
          <div className="mb-4 font-bold">{props.name}</div>
          <div><span className="font-bold text-sm">Population: </span>{props.population}</div>
          <div><span className="font-bold text-sm">Region: </span>{props.region}</div>
          <div><span className="font-bold text-sm">Capital: </span>{props.capital}</div>
        </div>
      </div>
    </div>
  );
}

function CountryGallery(props) {

}

function Button(props) {
  return (
    <button 
      className={`${props.size === 'lg' ? 'h-8' : 'h-6 w-20'} flex items-center bg-elements shadow rounded-sm py-2 px-8 text-xs font-semibold cursor-pointer`}
      onClick={props.onClick}
    >
      {props.iconPath && 
        <img src={props.iconPath} alt="{props.text}" className="h-3 mr-1 fill-current"/>
      }
      <span className="">{props.text}</span>
    </button>
  );
}

function DetailModal(props) {
  return (
    <div className="fixed bg-primary inset-0 mt-16 px-12 py-8 overflow-scroll">
      <Button 
        size='lg'
        text='Back'
        iconPath='images/icon-arrow-left.svg'
        onClick={props.onBackClick}
      />
      <div className="">
        <img className="mt-16" src={props.countryData.flagPath} alt={`flag of ${props.countryData.name}`}/>
        <div className="text-lg font-bold mt-10">{props.countryData.name}</div>
        <div className="my-6">
          <div className="c"><span className="font-bold text-sm">Native Name: </span>{props.countryData.name}</div>
          <div className="c"><span className="font-bold text-sm">Population: </span>{props.countryData.formattedPopulation}</div>
          <div className="c"><span className="font-bold text-sm">Region: </span>{props.countryData.region}</div>
          <div className="c"><span className="font-bold text-sm">Sub Region: </span>{props.countryData.subregion}</div>
          <div className="c"><span className="font-bold text-sm">Capital: </span>{props.countryData.capital}</div>
        </div>
        <div>
          <div className="c"><span className="font-bold text-sm">Top Level Domain: </span>{props.countryData.topLevelDomains}</div>
          <div className="c"><span className="font-bold text-sm">Currencies: </span>{props.countryData.currencies.map(cur => cur.name).join(', ')}</div>
          <div className="c"><span className="font-bold text-sm">Languages: </span>{props.countryData.languages.map(lang => lang.name).join(', ')}</div>
        </div>
        <div className="mt-6 mb-16">
          <div className="font-semibold mb-4">Border Countries: </div>
          <div className="flex flex-wrap">{props.countryData.borderingCountries.map(bc => <div className="m-1"><Button text={bc}/></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);

  //const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailModalCountry, setDetailModalCountry] = useState(null);

  //fetch countries only once when app is intialized
  useEffect(() => {
    const countries_data = fetchCountries();
    countries_data.then(countries => {
      setCountries(countries);
      // setFilteredCountries(countries);
      const unique_regions = Array.from(new Set(countries.map(c => c.region)));
      setRegions(unique_regions.sort().filter(r => r)); //sort and filter out empty
    });
  }, []);
  
  //update filteredCountries when search query changes or filter is applied
  useEffect(() => {
    let newFilteredCountries = countries;
    if (searchQuery) newFilteredCountries = newFilteredCountries.filter(c => c.name.toUpperCase().includes(searchQuery.toUpperCase()))
    if (selectedRegion) newFilteredCountries = newFilteredCountries.filter(c => c.region === selectedRegion)
    setFilteredCountries(newFilteredCountries);
  }, [countries, searchQuery, selectedRegion]);

  return (
    <div className={`h-screen w-full overflow-scroll theme-${theme} bg-primary text-primary`} style={{"fontFamily": 'Nunito Sans'}}>
      <Navbar 
        onThemeSwitch={() => setTheme(theme => theme === 'light' ? setTheme('dark') : setTheme('light'))}
        title="Where in the world?"
      />
      <div className="bg-primary flex items-center justify-between flex-wrap pl-12 pr-12 mt-8 w-full">
        <SearchBox 
          placeholder="Search for a country..."
          onChange={value => setSearchQuery(value)}
        />
        <div className="mt-8 md:mt-0">
          <Filter 
            placeholder="Filter by Region"
            showAllName="All Regions"
            options={regions}
            onChange={value => setSelectedRegion(value)}
          />
        </div>
      </div>

      <CountryGallery 
        countries={}
      />

      <div className="flex flex-wrap ml-4 mr-4">
        {filteredCountries.map(country =>
          <CountryCard
            key={country.code}
            className="flex flex-wrap ml-4 mr-4"
            name={country.name}
            population={country.formattedPopulation}
            region={country.region}
            capital={country.capital}
            flagPath={country.flagPath}
            onClick={() => setDetailModalCountry(filteredCountries.find(c => c.code === country.code))}
          />
        )}
      </div>

      {detailModalCountry && 
        <DetailModal
          countryData={detailModalCountry}
          onBackClick={() => setDetailModalCountry(null)}
        />
      }
    </div>
  );
}

async function fetchCountries() {
  console.log('fetchCountries called')
  const reponse = await fetch('https://restcountries.eu/rest/v2/all');
  const countries_json = await reponse.json();
  const countries_data = countries_json.map(country => {
    return {
      name: country.name,
      code: country.alpha3Code,
      formattedPopulation: country.population.toLocaleString(),
      region: country.region,
      capital: country.capital,
      flagPath: country.flag,
      nativeName: country.nativeName,
      subregion: country.subregion,
      topLevelDomains: country.topLevelDomain,
      currencies: country.currencies,
      languages: country.languages,
      borderingCountries: country.borders,
    }
  })
  return countries_data;
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
