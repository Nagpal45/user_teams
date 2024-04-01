import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/topBar/topBar';
import Card from '../../components/card/card';
import './team.css'

const Team = ({teamId}) => { 
  const [team, setTeam] = useState(null);
  const {id} = useParams();
  const history = useNavigate();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`/api/teams/${teamId || id}`); 
        setTeam(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [id, teamId]);


  const deleteTeam = async () => {
    try {
      const response = await axios.delete(`/api/teams/${id}`);
      console.log(response);

    } catch (error) {
      console.error('Error deleting team:', error);
    }
    history('/');
  }

  return (
    <div className='team'>
    {teamId ? (<TopBar teamName={team?.name} teamId={teamId}/>) : (<TopBar teamName={team?.name} deleteTeam={deleteTeam}/>)}
    
    <div className='users'>
      {team?.members?.map((member, index) => (
        <Card user={member} key={index}/>
      ))}
     </div>
    </div>
  );
};

export default Team;
