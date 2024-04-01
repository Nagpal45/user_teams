import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Team = () => { 
  const [team, setTeam] = useState(null);
  const {id} = useParams();
  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`/api/teams/${id}`); 
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [id]);

  return (
    <div>
      <h1>Team Details</h1>
      {team ? (
        <div>
          <h2>{team.name}</h2>
          <ul>
            {team.members.map((member) => (
              <li key={member._id}>{member.first_name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading team details...</p>
      )}
    </div>
  );
};

export default Team;
