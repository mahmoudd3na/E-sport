import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Tournament from '../components/Tournament';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    axios
      .get('http://localhost:3001/tournaments')
      .then((response) => {
        setTournaments(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  const openTournaments = tournaments.filter((tournament) => tournament.status === 'open');
  const closedTournaments = tournaments.filter((tournament) => tournament.status === 'closed');

  const renderedOpenTournaments = openTournaments.map((tournament) => (
    <Tournament key={tournament.id} data={tournament} />
  ));

  const renderedClosedTournaments = closedTournaments.map((tournament) => (
    <Tournament key={tournament.id} data={tournament} />
  ));

  return (
    <div className="tour-container">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="open-container">
            <h1 className="tour-header">Open Tournaments</h1>
            <table className="open-tour">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Participants</th>
                  <th>Place</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>{renderedOpenTournaments}</tbody>
            </table>
          </div>

          <div className='closed-add'>

            <div className="add-results">
              <Link to="/Create">
                <div className="add-tournament">
                  <img className="vector-icon" src="/plus.png" alt="Add Tournament" />
                </div>
                <h2>Add Tournament</h2>
              </Link>
            </div>

            <div className="closed-container">
              <h1 className="tour-header">Upcoming Tournaments</h1>
              <table className="closed-tour">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Participants</th>
                    <th>Place</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>{renderedClosedTournaments}</tbody>
              </table>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
