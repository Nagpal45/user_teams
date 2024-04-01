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

  const history = useNavigate();

  const applyFilters = async (filters) => {
    setFilters(filters);
  };

  const handleUserSelect = (userId) => {
    const index = selectedUsers.indexOf(userId);
    if (index !== -1) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      console.log(teamName);
      console.log(selectedUsers);
      const response = await axios.post('/api/teams', { name: teamName, memberIds: selectedUsers });
      setSelectedUsers([]);
      setShowForm(false);
      console.log(response);
      history(`/teams/${response.data._id}`);
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  return (
    <div className='home'>
      <TopBar setSelect={setSelect} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} setShowForm={setShowForm}/>
      <FilterBar applyFilters={applyFilters} />
      {select && ( <p className='text'>**Click on the card to select</p> )}
      <Users filters={filters} page={page} select={select} onUserSelect ={handleUserSelect} selectedUsers={selectedUsers}/>
      <Pagination filters={filters} setPage={setPage}/>
      {showForm && (
        <div className="formWrapper">
        <form onSubmit={handleCreateTeam} className='teamForm'>
          <button className='close' onClick={()=>setShowForm(false)}><Close/></button>
          <input type="text" id="teamName" placeholder='Enter Team Name' onChange={(e) => setTeamName(e.target.value)}/>
          <button className='submit' type='submit'>Create Team</button>
        </form>
        </div>
      )}
    </div>
  );
}
