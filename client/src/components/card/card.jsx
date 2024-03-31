import React from 'react';
import './card.css';
import { Email, WcOutlined, Work } from '@mui/icons-material';


export default function Card({user}) {
  return (
        <div className='card'>
        <div className="top">
            <div className="left">
                <div className='detail'>
                <Email style={{fontSize:"1vw"}}/>
                <p>{user.email}</p>
                </div>
                <div className='detail'>
                <WcOutlined style={{fontSize:"1vw"}}/>
                <p>{user.gender}</p>
                </div>
                <div className='detail'>
                <Work style={{fontSize:"1vw"}}/>
                <p>{user.domain}</p>
                </div>
            </div>
            <div className='right'>
                <p className={user.available ? "available" : "notAvailable"}>{user.available ? "Available" : "Not available"}</p>
            </div>
        </div>
        <img src={user.avatar} alt="" />
        <div className="bottom">
            <h4>{user.first_name +" "+user.last_name}</h4>
        </div>
    </div>
  )
}
