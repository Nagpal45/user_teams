import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Team from '../team/team';
import './teams.css'
import { Loading } from '../../components/loading/loading';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
      finally {
        setTimeout(() => {
          setLoading(false); 
        },500)
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="teams">
      {loading && (<Loading/>)}
        {teams?.map((team) => (
            <Team teamId={team._id} key = {team._id}/>
        ))}
    </div>
  );
}
