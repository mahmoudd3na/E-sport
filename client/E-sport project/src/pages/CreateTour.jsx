
import React, { useState, useEffect } from 'react';
import './CreateTour.css';

const CreateTour = () => {
    const [tournamentData, setTournamentData] = useState({
        name: '',
        place: '',
        day: '',
        time: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [createdTournament, setCreatedTournament] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch user ID from the API using the token stored in local storage
        const fetchUserId = async () => {
            const token = localStorage.getItem('accessToken'); // Replace with your actual storage key
            if (token) {
                try {
                    const response = await fetch('http://localhost:3001/users/current', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserId(userData.id);
                    } else {
                        console.error('Failed to fetch user ID from the server.');
                    }
                } catch (error) {
                    console.error('An error occurred while fetching user ID:', error);
                }
            }
        };

        fetchUserId();
    }, []); // This effect runs once when the component mounts

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTournamentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/tournaments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...tournamentData,
                    organizer: userId,
                }),
            });

            if (response.ok) {
                const createdTournamentData = await response.json();
                setCreatedTournament(createdTournamentData);
                setSubmitted(true);
            } else {
                console.error('Failed to send tournament data to the server.');
            }
        } catch (error) {
            console.error('An error occurred while sending the data:', error);
        }
    };

    return (
        <>

            {!submitted && !createdTournament ? (
                <form className="custom-tournament-form" onSubmit={handleSubmit}>
                    <h2>Create Tournament</h2>
                    <label className="custom-form-label">
                        Name of the Tournament:
                        <input
                            className="custom-form-input"
                            type="text"
                            name="name"
                            value={tournamentData.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="custom-form-label">
                        Place:
                        <input
                            className="custom-form-input"
                            type="text"
                            name="place"
                            value={tournamentData.place}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="custom-form-label">
                        Day:
                        <input
                            className="custom-form-input"
                            type="text"
                            name="day"
                            value={tournamentData.day}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label className="custom-form-label">
                        Time:
                        <input
                            className="custom-form-input"
                            type="text"
                            name="time"
                            value={tournamentData.time}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button className="custom-submit-button" type="submit">
                        Create Tournament
                    </button>
                </form>) : (
                <div>
                    <h2>Tournament Created!</h2>
                    <p>Name: {createdTournament.name}</p>
                    <p>Place: {createdTournament.place}</p>
                    <p>Day: {createdTournament.day}</p>
                    <p>Time: {createdTournament.time}</p>
                </div>)
            }
        </>

    );
};

export default CreateTour; 