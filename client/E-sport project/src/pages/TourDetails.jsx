import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { users } from '../constants/users';
import { tournaments } from '../constants/tournaments';
import "./TourDetails.css";
import Diagram from '../components/diagram';

export default function TourDetails() {
    const { id } = useParams(); // the id of the tournament
    const [tour, setTour] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [organizer, setOrganizer] = useState(null);

    useEffect(() => {
        // Find the tournament when the component mounts
        const foundTour = tournaments.find(t => t.id === Number(id));
        setTour(foundTour);

        // Set participants and organizer based on the found tournament
        if (foundTour) {
            const participantUsers = foundTour.users.map(userId =>
                users.find(user => user.id === userId)
            );
            setParticipants(participantUsers);

            const organizerUser = users.find(user => user.id === foundTour.organizer);
            setOrganizer(organizerUser);
        }
    }, [id]);

    // Check if the tournament is found
    if (!tour) {
        return <div>Loading...</div>; // You might want to add a loading state or redirect
    }

    // // Check if the user is the organizer and if the tournament has started
    // const isOrganizer = /* logic to check if the current user is the organizer */;
    // const isTournamentStarted = /* logic to check if the tournament has started */;

    return (
        <div className='draw-container'>
            <h2>{tour.name}</h2>
            {tour.users.length > 0 ? (
                <h1 className='participant'>Participants </h1>
            ) : (
                <h1 className='participant'>No Participants Yet</h1>
            )}
            {participants.length > 0 && (
                <div className='partici'>{participants.map(player => (
                    <div key={player.id} className='users-participants'>
                        <img src={player.picture} alt={player.name} />
                        <p>{player.name}</p>
                    </div>
                ))}</div>
            )}

            <div className='tour-info'>
                <div className='info-tour'>
                    <p>Status : {tour.status}</p>
                    <p>Date : {tour.day} {tour.time}</p>
                    <p>Place : {tour.place}</p>
                </div>
                <div className='organizer'>
                    <p>Organizer</p>
                    <img src={organizer.picture} alt={organizer.name} />
                    <p>{organizer.name}</p>
                </div>
            </div>

            {participants.length > 0 && <Diagram draw={tour.draw} />}

            {/* {isOrganizer && isTournamentStarted && (
            * Render the controls for the organizer to determine winners/losers 
                <div>Organizer Controls</div>
            )} */}
        </div>
    );
}
