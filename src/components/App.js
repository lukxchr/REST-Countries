import React, {useState, useEffect} from 'react';

import Navbar from './Navbar';
import SearchBox from './SearchBox';
import Filter from './Filter';
import CountryGallery from './CountryGallery';
import DetailModal from './DetailModal';

import {fetchCountries} from '../RESTCountriesAPIClient';

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
    if (searchQuery) {
      newFilteredCountries = newFilteredCountries.filter(
        c => c.name.toUpperCase().includes(searchQuery.toUpperCase()));
    }
    if (selectedRegion) {
      newFilteredCountries = newFilteredCountries.filter(
        c => c.region === selectedRegion);
    }
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
    <div className={`h-screen w-full overflow-y-scroll overflow-x-hidden theme-${theme} bg-primary text-primary`}>
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
        <div className="w-full h-72 px-24 text-center flex items-center justify-center text-xl">
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

export default App;
