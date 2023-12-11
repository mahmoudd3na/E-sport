import React, { useState } from 'react';

const CreateTour = () => {
    const [tournamentData, setTournamentData] = useState({
        name: '',
        place: '',
        day: '',
        time: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTournamentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here, e.g., send data to the server.

        // For demonstration purposes, log the data to the console.
        console.log('Tournament Data:', tournamentData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={tournamentData.name}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Place:
                <input
                    type="text"
                    name="place"
                    value={tournamentData.place}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Day:
                <input
                    type="text"
                    name="day"
                    value={tournamentData.day}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Time:
                <input
                    type="text"
                    name="time"
                    value={tournamentData.time}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Create Tournament</button>
        </form>
    );
};

export default CreateTour; 