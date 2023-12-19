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
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/tournaments`)
            .then((response) => {
                setTournaments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    const endedTournaments = tournaments.filter((tournament) => tournament.status === 'ended');

    const renderedEndedTournaments = endedTournaments.map((tournament) => (
        <Tournament key={tournament.id} data={tournament} />
    ));

    return (
        <div className="finished-container">
            <h1 className="tour-header3">Finished Tournaments</h1>
            <table className="finished-tour">
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
