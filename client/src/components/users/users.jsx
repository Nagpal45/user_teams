import React, { useEffect, useState } from 'react';
import Card from '../card/card';
import axios from 'axios';
import './users.css';

const Users = ({ filters, page, select, onUserSelect, selectedUsers }) => {
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get('/api/users', { params: { ...filters, page } });
        const data = await res.data.users;
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    getUsers();
  }, [filters, page]);


  return (
    <div className='users'>
      {warning && <div className="warning">{warning}</div>}
      {users?.map((user, index) => (
        <Card user={user} key={index} select={select} onClick={onUserSelect} selectedUsers={selectedUsers} setWarning={setWarning}/>
      ))}
    </div>
  );
};

export default Users;
