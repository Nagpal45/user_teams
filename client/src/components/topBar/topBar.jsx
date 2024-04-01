import React, { useState } from 'react'
import './topBar.css';
import { Link } from 'react-router-dom';

export default function TopBar({ teamName, setSelect, setSelectedUsers, setShowForm, deleteTeam, teamId }) {
  const [isSelect, setIsSelect] = useState();

  const handleSelect = () => {
    setSelect(true);
    setIsSelect(true);
  }
  const handleUnSelect = () => {
    setIsSelect(false);
    setSelect(false);
    setSelectedUsers([]);
  }
  const handleForm = () => {
    setShowForm(true);
  }
  return (
    <div className='topBar'>
      <h1>{teamName ? teamName : "Users"}</h1>
      {teamId ? (<Link to={`/teams/${teamId}`}>
        <button>View Team</button>
      </Link>
      ) : deleteTeam ? (
        <button onClick={deleteTeam}>Delete Team</button>
      ) : (
        isSelect ? (
          <div>
            <button onClick={handleUnSelect}>Cancel</button>
            <button onClick={handleForm}>Done</button>
          </div>
        ) : (
          <button onClick={handleSelect}>Create Team</button>
        )
      )}
    </div>
  );

}
