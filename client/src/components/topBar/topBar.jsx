import React, { useState } from 'react'
import './topBar.css';

export default function TopBar({setSelect, setSelectedUsers, setShowForm}) {
  const[isSelect, setIsSelect] = useState();
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
        <h1>Users</h1>
        {isSelect ? (<div>
          <button onClick={handleUnSelect}>Cancel</button>
          <button onClick={handleForm}>Done</button>
        </div>) : (<button onClick={handleSelect}>Create Team</button>)}
    </div>
  )
}
