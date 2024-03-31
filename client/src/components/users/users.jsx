import React, { useEffect, useState } from 'react';
import Card from '../card/card';
import axios from 'axios';
import './users.css';

const Users = ({ filters, page }) => {
  const [users, setUsers] = useState([]);

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
      {users?.map((user, index) => (
        <Card user={user} key={index} />
      ))}
    </div>
  );
};

export default Users;
