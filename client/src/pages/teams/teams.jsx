import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Team from '../team/team';
import './teams.css'

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="teams">
        {teams.map((team) => (
            <Team teamId={team._id} key = {team._id}/>
        ))}
    </div>
  );
}
