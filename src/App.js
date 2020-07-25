import React, {useState, useEffect} from 'react';
import {ReactComponent as LeftArrowIcon} from './assets/images/icon-arrow-left.svg';

function Navbar(props) {
  return (
      <div className="bg-elements shadow h-16 flex items-center justify-between pl-12 pr-12 sticky top-0 z-10">
          <div className="text-xl font-bold">{props.title}</div>
          <button className="flex items-center focus:outline-none" onClick={props.onThemeSwitch}>
            <svg className="h-4 fill-current" viewBox="0 0 24 24"><path d="M9.57 3.38a8 8 0 0 0 10.4 10.4 1 1 0 0 1 1.31 1.3 10 10 0 1 1-13-13 1 1 0 0 1 1.3 1.3zM7.1 5.04A8 8 0 1 0 18.3 16.27 10 10 0 0 1 7.08 5.04z"/></svg>
            <span className="ml-1 font-semibold tracking-tight text-xs">Dark Mode</span>
          </button>
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
        <div 
          className="bg-elements flex items-center justify-between h-12 rounded p-4 bg-white hover:bg-input" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption : props.placeholder}
          <svg className="h-2 ml-6 fill-current" viewBox="0 0 491.996 491.996"><path d="M484.132 124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z"/></svg>
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

function CountryCard(props) {
  return (  
    <div className="bg-elements rounded shadow overflow-hidden" onClick={props.onClick}>
      <img className="w-full sm:object-contain md:object-cover md:h-32 " src={props.flagPath} alt={`flag of ${props.name}`}/>
      <div className="bg-gray-200 pl-4 pr-4 pb-8 pt-6 text-gray-800">
        <div className="truncate mb-4 font-bold">{props.name}</div>
        <div><span className="label">Population: </span>{props.population}</div>
        <div><span className="label">Region: </span>{props.region}</div>
        <div><span className="label">Capital: </span>{props.capital}</div>
      </div>
    </div>
  );
}

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

function Button(props) {
  return (
    <button 
      className={`${props.size === 'lg' ? 'h-8' : 'h-6 w-24'} flex items-center justify-center bg-elements shadow rounded-sm py-2 px-8 text-xs font-semibold cursor-pointer hover:bg-input`}
      title={props.title}
      onClick={props.onClick}
    >
      {props.icon ?? props.icon}
      {props.text}
    </button>
  );
}

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
        <div className="flex justify-center mt-16 md:w-1/2 md:h-80 md:pr-16">
          <img 
            className="shadow md:h-full md:object-cover" 
            src={props.country.flagPath} 
            alt={`flag of ${props.country.name}`}
          />
        </div>
        <div className="md:w-1/2 md:flex md:flex-wrap md:mt-12">
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
            <div><span className="label">Currencies: </span>{props.country.currencies.map(cur => cur.name).join(', ')}</div>
            <div><span className="label">Languages: </span>{props.country.languages.map(lang => lang.name).join(', ')}</div>
          </div>
          {props.country.borderingCountries.length > 0 && <div className="mb-16">
            <div className="font-semibold mt-6 mb-2 md:mb-1">Border Countries: </div>
            <div className="flex flex-wrap justify-between md:justify-start">
              {props.country.borderingCountries.map(bc => 
                <div className="m-1" key={bc.code}>
                  <Button 
                    text={bc.name.length < 16 ? bc.name : bc.code}
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

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light');
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

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  function loadDetailModal(countryCode) {
    const country = countries.find(c => c.code === countryCode);
    setDetailModalCountry(country);
  }

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
      {filteredCountries.length ? <CountryGallery 
        countries={filteredCountries}
        onCardClick={countryCode => loadDetailModal(countryCode)}
        />
        :
        <div className="w-full h-72 flex items-center justify-center text-xl">
          {countries.length ? 'No countries matching your search criteria.' : 'Loading countries...'}
        </div>
      }
      {detailModalCountry && 
        <DetailModal
          country={detailModalCountry}
          onBackClick={() => setDetailModalCountry(null)}
          onBorderingCountryClick={countryCode => loadDetailModal(countryCode)}
        />
      }
    </div>
  );
}

async function fetchCountries() {
  const reponse = await fetch('https://restcountries.eu/rest/v2/all');
  const countriesJSON = await reponse.json();

  const codeNameMap = 
    {"AFG": "Afghanistan","ALA": "Åland Islands","ALB": "Albania","DZA": "Algeria","ASM": "American Samoa","AND": "Andorra","AGO": "Angola","AIA": "Anguilla","ATA": "Antarctica","ATG": "Antigua and Barbuda","ARG": "Argentina","ARM": "Armenia","ABW": "Aruba","AUS": "Australia","AUT": "Austria","AZE": "Azerbaijan","BHS": "Bahamas","BHR": "Bahrain","BGD": "Bangladesh","BRB": "Barbados","BLR": "Belarus","BEL": "Belgium","BLZ": "Belize","BEN": "Benin","BMU": "Bermuda","BTN": "Bhutan","BOL": "Bolivia (Plurinational State of)","BES": "Bonaire, Sint Eustatius and Saba","BIH": "Bosnia and Herzegovina","BWA": "Botswana","BVT": "Bouvet Island","BRA": "Brazil","IOT": "British Indian Ocean Territory","UMI": "United States Minor Outlying Islands","VGB": "Virgin Islands (British)","VIR": "Virgin Islands (U.S.)","BRN": "Brunei Darussalam","BGR": "Bulgaria","BFA": "Burkina Faso","BDI": "Burundi","KHM": "Cambodia","CMR": "Cameroon","CAN": "Canada","CPV": "Cabo Verde","CYM": "Cayman Islands","CAF": "Central African Republic","TCD": "Chad","CHL": "Chile","CHN": "China","CXR": "Christmas Island","CCK": "Cocos (Keeling) Islands","COL": "Colombia","COM": "Comoros","COG": "Congo","COD": "Congo (Democratic Republic of the)","COK": "Cook Islands","CRI": "Costa Rica","HRV": "Croatia","CUB": "Cuba","CUW": "Curaçao","CYP": "Cyprus","CZE": "Czech Republic","DNK": "Denmark","DJI": "Djibouti","DMA": "Dominica","DOM": "Dominican Republic","ECU": "Ecuador","EGY": "Egypt","SLV": "El Salvador","GNQ": "Equatorial Guinea","ERI": "Eritrea","EST": "Estonia","ETH": "Ethiopia","FLK": "Falkland Islands (Malvinas)","FRO": "Faroe Islands","FJI": "Fiji","FIN": "Finland","FRA": "France","GUF": "French Guiana","PYF": "French Polynesia","ATF": "French Southern Territories","GAB": "Gabon","GMB": "Gambia","GEO": "Georgia","DEU": "Germany","GHA": "Ghana","GIB": "Gibraltar","GRC": "Greece","GRL": "Greenland","GRD": "Grenada","GLP": "Guadeloupe","GUM": "Guam","GTM": "Guatemala","GGY": "Guernsey","GIN": "Guinea","GNB": "Guinea-Bissau","GUY": "Guyana","HTI": "Haiti","HMD": "Heard Island and McDonald Islands","VAT": "Holy See","HND": "Honduras","HKG": "Hong Kong","HUN": "Hungary","ISL": "Iceland","IND": "India","IDN": "Indonesia","CIV": "Côte d'Ivoire","IRN": "Iran (Islamic Republic of)","IRQ": "Iraq","IRL": "Ireland","IMN": "Isle of Man","ISR": "Israel","ITA": "Italy","JAM": "Jamaica","JPN": "Japan","JEY": "Jersey","JOR": "Jordan","KAZ": "Kazakhstan","KEN": "Kenya","KIR": "Kiribati","KWT": "Kuwait","KGZ": "Kyrgyzstan","LAO": "Lao People's Democratic Republic","LVA": "Latvia","LBN": "Lebanon","LSO": "Lesotho","LBR": "Liberia","LBY": "Libya","LIE": "Liechtenstein","LTU": "Lithuania","LUX": "Luxembourg","MAC": "Macao","MKD": "Macedonia (the former Yugoslav Republic of)","MDG": "Madagascar","MWI": "Malawi","MYS": "Malaysia","MDV": "Maldives","MLI": "Mali","MLT": "Malta","MHL": "Marshall Islands","MTQ": "Martinique","MRT": "Mauritania","MUS": "Mauritius","MYT": "Mayotte","MEX": "Mexico","FSM": "Micronesia (Federated States of)","MDA": "Moldova (Republic of)","MCO": "Monaco","MNG": "Mongolia","MNE": "Montenegro","MSR": "Montserrat","MAR": "Morocco","MOZ": "Mozambique","MMR": "Myanmar","NAM": "Namibia","NRU": "Nauru","NPL": "Nepal","NLD": "Netherlands","NCL": "New Caledonia","NZL": "New Zealand","NIC": "Nicaragua","NER": "Niger","NGA": "Nigeria","NIU": "Niue","NFK": "Norfolk Island","PRK": "Korea (Democratic People's Republic of)","MNP": "Northern Mariana Islands","NOR": "Norway","OMN": "Oman","PAK": "Pakistan","PLW": "Palau","PSE": "Palestine, State of","PAN": "Panama","PNG": "Papua New Guinea","PRY": "Paraguay","PER": "Peru","PHL": "Philippines","PCN": "Pitcairn","POL": "Poland","PRT": "Portugal","PRI": "Puerto Rico","QAT": "Qatar","KOS": "Republic of Kosovo","REU": "Réunion","ROU": "Romania","RUS": "Russian Federation","RWA": "Rwanda","BLM": "Saint Barthélemy","SHN": "Saint Helena, Ascension and Tristan da Cunha","KNA": "Saint Kitts and Nevis","LCA": "Saint Lucia","MAF": "Saint Martin (French part)","SPM": "Saint Pierre and Miquelon","VCT": "Saint Vincent and the Grenadines","WSM": "Samoa","SMR": "San Marino","STP": "Sao Tome and Principe","SAU": "Saudi Arabia","SEN": "Senegal","SRB": "Serbia","SYC": "Seychelles","SLE": "Sierra Leone","SGP": "Singapore","SXM": "Sint Maarten (Dutch part)","SVK": "Slovakia","SVN": "Slovenia","SLB": "Solomon Islands","SOM": "Somalia","ZAF": "South Africa","SGS": "South Georgia and the South Sandwich Islands","KOR": "Korea (Republic of)","SSD": "South Sudan","ESP": "Spain","LKA": "Sri Lanka","SDN": "Sudan","SUR": "Suriname","SJM": "Svalbard and Jan Mayen","SWZ": "Swaziland","SWE": "Sweden","CHE": "Switzerland","SYR": "Syrian Arab Republic","TWN": "Taiwan","TJK": "Tajikistan","TZA": "Tanzania, United Republic of","THA": "Thailand","TLS": "Timor-Leste","TGO": "Togo","TKL": "Tokelau","TON": "Tonga","TTO": "Trinidad and Tobago","TUN": "Tunisia","TUR": "Turkey","TKM": "Turkmenistan","TCA": "Turks and Caicos Islands","TUV": "Tuvalu","UGA": "Uganda","UKR": "Ukraine","ARE": "United Arab Emirates","GBR": "United Kingdom of Great Britain and Northern Ireland","USA": "United States of America","URY": "Uruguay","UZB": "Uzbekistan","VUT": "Vanuatu","VEN": "Venezuela (Bolivarian Republic of)","VNM": "Viet Nam","WLF": "Wallis and Futuna","ESH": "Western Sahara","YEM": "Yemen","ZMB": "Zambia","ZWE": "Zimbabwe"}
  const countriesData = countriesJSON.map(country => {
    const borderingCountries = country.borders.map(code => {
      return {name: codeNameMap[code], code: code}
    });
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
      borderingCountries: borderingCountries,
    }
  })
  return countriesData;
}

export default App;
