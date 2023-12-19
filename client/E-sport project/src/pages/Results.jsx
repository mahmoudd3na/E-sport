// FinishedTournaments.js
import React from 'react';
import { useState, useEffect } from 'react';
import Tournament from '../components/Tournament';
import axios from "axios"
import "./style.css"

const Results = () => {

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
    const endedTournaments = tournaments.filter((tournament) => tournament.status === 'ended');

    const renderedEndedTournaments = endedTournaments.map((tournament) => (
        <Tournament key={tournament.id} data={tournament} />
    ));

    return (
        <div className="closed-container finished-tour">
            <h1 className="tour-header">Finished Tournaments</h1>
            <table className="closed-tour">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Participants</th>
                        <th>Place</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{renderedEndedTournaments}</tbody>
            </table>
        </div>
    );
};

export default Results;
