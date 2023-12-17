import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { tournaments } from '../constants/tournaments';
import Tournament from '../components/Tournament';
import axios from "axios";

export default function Tournaments() {
  const openTournaments = tournaments.filter(tournament => tournament.status === 'open');


  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios.get('http://localhost:3001/tournaments')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts
  console.log("tournaments: ", items);


  const renderedTournaments = openTournaments.map(tournament => (
    <Tournament key={tournament.id} data={tournament} />
  ));

  return (
    <div className="tour-container">
      <div className="open-container">
        <h1 className="tour-header">Open Tournaments</h1>
        <table className="open-tour">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Place</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{renderedTournaments}</tbody>
        </table>
      </div>

      <div className="add-results">
        <Link to="/Create">
          <div className="add-tournament">
            <img className="vector-icon" src="/plus.png" alt="Add Tournament" />
          </div>
        </Link>
      </div>
    </div>
  );
}
