import React, { useEffect, useState } from 'react';
import './card.css';
import { Email, MoreHoriz, WcOutlined, Work } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Card({ user, select, handleUserSelect, selectedUsers, setWarning, getUsers }) {
    const [selected, setSelected] = useState();
    const [showMenu, setShowMenu] = useState(false);

    const history = useNavigate();

    useEffect(() => {
        setSelected(selectedUsers?.some((u) => u._id === user._id));
    }, [selectedUsers, user._id]);

    const handleClick = () => {
        if (select) {
            if (selectedUsers?.some((u) => u._id === user._id)) {
                handleUserSelect(user);
                setWarning('');
              } else if (!user.available) {
                setWarning('Cannot select user because the user is not available.');
              } else if (selectedUsers?.some((u) => u.domain === user.domain)) {
                setWarning('Cannot select user due to domain conflict.');
              } else {
                handleUserSelect(user);
                setWarning('');
              }
        }
    };

    const handleDelete = async () => {
        try {
        const response = await axios.delete(`/api/users/${user.id}`);
        await getUsers(); 
        console.log(response);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
        setTimeout(()=>{
            setShowMenu(false);
        },100)
    };

    const handleEdit = () => {
        history(`/users/${user.id}`);
        setShowMenu(false);
    };

    return (
        <div className={select ? selected ? 'selected canSelect card' : 'canSelect card' : 'card'} onClick={handleClick}>
            <div className="top">
                <div className="left">
                    <div className='detail'>
                        <Email style={{ fontSize: "1vw" }} />
                        <p>{user.email}</p>
                    </div>
                    <div className='detail'>
                        <WcOutlined style={{ fontSize: "1vw" }} />
                        <p>{user.gender}</p>
                    </div>
                    <div className='detail'>
                        <Work style={{ fontSize: "1vw" }} />
                        <p>{user.domain}</p>
                    </div>
                </div>
                <div className='right'>
                    <p className={user.available ? "available" : "notAvailable"}>{user.available ? "Available" : "Not available"}</p>
                </div>
            </div>
            <img src={user.avatar} alt="" />
            <div className="bottom">
                <MoreHoriz className='dots' onClick={() => setShowMenu(!showMenu)}/>
                <h4>{user.first_name + " " + user.last_name}</h4>
                {showMenu && (
                <div className="menu">
                    <button onClick={handleEdit}>Edit User</button>
                    <div className='sepline'></div>
                    <button onClick={handleDelete}>Delete User</button>
                </div>
            )}
            </div>
        </div>
    )
}
