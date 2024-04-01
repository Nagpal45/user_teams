import React, { useState } from 'react'
import Users from '../../components/users/users'
import FilterBar from '../../components/filterBar/filterBar'
import Pagination from '../../components/pagination/pagination'
import './home.css'
import TopBar from '../../components/topBar/topBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Close } from '@mui/icons-material'

export default function Home() {
  const [filters, setFilters] = useState({
    domain: '',
    gender: '',
    available: '',
    search: ''
  });
  const [page, setPage] = useState();
  const [select, setSelect] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [add, setAdd] = useState(false);

  const history = useNavigate();

  const applyFilters = async (filters) => {
    setFilters(filters);
  };

  const handleUserSelect = (user) => {
    const index = selectedUsers.findIndex((u) => u._id === user._id);
    if (index !== -1) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };


  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const memberIds = selectedUsers.map((user) => user._id);
      const response = await axios.post('/api/teams', { name: teamName, memberIds });
      setSelectedUsers([]);
      setShowForm(false);
      console.log(response);
      history(`/teams/${response.data._id}`);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleAdd = () => {
    setAdd(true);
  }

  const handleAddUser = async (e) => {
    const userDetails = {
      first_name: e.target.elements.firstName.value,
      last_name: e.target.elements.lastName.value,
      email: e.target.elements.email.value,
      gender: e.target.elements.gender.value,
      domain: e.target.elements.domain.value,
      available: e.target.elements.available.value === 'true'
    };
    try {
      const response = await axios.post('/api/users', userDetails);
      setAdd(false);
      console.log(response);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };


  return (
    <div className='home'>
      <TopBar setSelect={setSelect} setSelectedUsers={setSelectedUsers} setShowForm={setShowForm} handleAdd={handleAdd} />
      <FilterBar applyFilters={applyFilters} />
      {select && (<p className='text'>**Click on the card to select</p>)}
      <Users filters={filters} page={page} select={select} handleUserSelect={handleUserSelect} selectedUsers={selectedUsers} />
      <Pagination filters={filters} setPage={setPage} />
      {showForm && (
        <div className="formWrapper">
          <form onSubmit={handleCreateTeam} className='teamForm'>
            <input type="text" id="teamName" placeholder='Enter Team Name' onChange={(e) => setTeamName(e.target.value)} />
            <button className='submit' type='submit'>Add User</button>
          </form>
        </div>
      )}
      {add && (
        <div className="formWrapper">
          <form onSubmit={handleAddUser} className='userForm'>
            <button className='close' onClick={() => setAdd(false)}><Close /></button>
            <input type="text" name="firstName" placeholder='Enter First Name' />
            <input type="text" name="lastName" placeholder='Enter Last Name' />
            <input type="email" name="email" placeholder='Enter Email' />
            <input type="text" name="gender" placeholder='Enter Gender' />
            <input type="text" name="domain" placeholder='Enter Domain' />
            <select name="available" defaultValue="">
              <option value="" disabled>Select Availability</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <button className='submitUser' type='submit'>Add User</button>
          </form>
        </div>
      )}
    </div>
  );
}
