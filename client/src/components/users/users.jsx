import React, { useEffect, useState } from 'react';
import Card from '../card/card';
import axios from 'axios';
import './users.css';
import { Error } from '@mui/icons-material';

const Users = ({ filters, page, select, handleUserSelect, selectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState('');

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users', { params: { ...filters, page } });
      const data = await res.data.users;
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [filters, page]);

  return (
    <div className='users'>
      {warning && <div className="warning"><Error/>{warning}</div>}
      {users?.map((user, index) => (
        <Card user={user} key={index} select={select} handleUserSelect={handleUserSelect} selectedUsers={selectedUsers} setWarning={setWarning} getUsers={getUsers}/>
      ))}
    </div>
  );
};

export default Users;
