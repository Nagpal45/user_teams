import React, { useState } from 'react'
import Users from '../../components/users/users'
import FilterBar from '../../components/filterBar/filterBar'
import Pagination from '../../components/pagination/pagination'
import './home.css'

export default function Home() {
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    available: '',
    search: ''
  });
  const [page, setPage] = useState();

  const applyFilters = async (filters) => {
    setFilters(filters);
  };

  return (
    <div className='home'>
      <FilterBar applyFilters={applyFilters} />
      <Users filters={filters} page={page}/>
      <Pagination filters={filters} setPage={setPage}/>
    </div>
  );
}
