import React, { useEffect, useState } from 'react';
import './card.css';
import { Email, WcOutlined, Work } from '@mui/icons-material';


export default function Card({ user, select, onClick, selectedUsers, setWarning }) {
    const [selected, setSelected] = useState();
    useEffect(() => {
        setSelected(selectedUsers.includes(user._id));
    }, [selectedUsers, user._id])

    const handleClick = () => {
        if (select) {
            if (!user.available) {
                setWarning('Cannot select user because the user is not available.');
            } else if (
                selectedUsers.some(
                    selectedUser => selectedUser.domain === user.domain
                )
            ) {
                setWarning('Cannot select user due to domain conflict.');
            } else {
                onClick(user._id);
                setWarning('');
            }
        }
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
                <h4>{user.first_name + " " + user.last_name}</h4>
            </div>
        </div>
    )
}
