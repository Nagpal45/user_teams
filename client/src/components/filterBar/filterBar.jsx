import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './filterBar.css'
import { Search } from '@mui/icons-material'

const FilterBar = ({ applyFilters }) => {
  const initialFilters = {
    domain: '',
    gender: '',
    available: '',
    search: ''
  }

  const [filters, setFilters] = useState(initialFilters);
  const [domains, setDomains] = useState([]);
  const [genders, setGenders] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get('/api/users');
        setDomains(res.data.domains);
        setGenders(res.data.genders);
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(()=>{
    applyFilters(filters);
  }, [filters, applyFilters])

  const handleClearFilters = () => {
    setFilters(initialFilters);
    applyFilters(initialFilters);
  };

  return (
    <div className='filterBar'>
      <div className="searchBar">
      <Search className='searchIcon'/>
      <input
        type="text"
        placeholder="Search"
        name="search"
        value={filters.search}
        onChange={handleChange}
        className='search'
      />
      </div>
      <div className="filters">
      <select name="domain" value={filters.domain} onChange={handleChange}>
        <option value="">Select Domain</option>
        {domains?.map((domain) => (
          <option key={domain} value={domain}>{domain}</option>
        ))}
      </select>
      <select name="gender" value={filters.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        {genders?.map((gender) => (
          <option key={gender} value={gender}>{gender}</option>
        ))}
      </select>
      <select name="available" value={filters.available} onChange={handleChange}>
        <option value="">Select Availability</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
      <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
};

export default FilterBar;
