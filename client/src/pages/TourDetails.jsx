import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./TourDetails.css";
import Diagram from '../components/Diagram';
import LoadingSpinner from '../components/LoadingSpinner';
import useCurrentUser from '../Hooks/useCurrentUser';
import TournamentBracket from '../components/TournamentBracket';


export default function TourDetails() {
    const { id } = useParams(); // the id of the tournament
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState([]);
    const [organizer, setOrganizer] = useState(null);

    const currentUser = useCurrentUser();


    const fetchTournamentData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tournaments/${id}`); // Replace 'your_tournament_api_endpoint' with the actual tournament API endpoint
            const tournamentData = await response.json();
            console.log("tournament data:", tournamentData)
            setTour(tournamentData);

            // Fetch user data for participants
            const participantUserIds = tournamentData.users;
            console.log("participant users id", participantUserIds);
            const participantPromises = participantUserIds.map(async userId => {
                const userResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userId}`); // Replace 'your_user_api_endpoint' with the actual user API endpoint
                const userData = await userResponse.json();
                return userData;
            });

            const participantUsers = await Promise.all(participantPromises);

            console.log("participants:", participantUsers)
            setParticipants(participantUsers);

            const organizerUserId = tournamentData.organizer;
            const organizerResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${organizerUserId}`);
            const organizerUserData = await organizerResponse.json();
            console.log(organizerUserData);

            setOrganizer(organizerUserData);
        } catch (error) {
            console.error('Error fetching tournament data:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTournamentData();
    }, [id]);
    if (loading) {
        return <LoadingSpinner />
    }

    if (!tour) {
        return <div>Tournament not found</div>;
    }


    const handleJoinTournament = async () => {

        const token = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tournaments/${id}/join`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            fetchTournamentData();
            if (response.ok) {
                console.log("Successfully joined the tournament!");
            } else {
                console.error("Failed to join the tournament");
            }
        } catch (error) {
            throw new Error('An unexpected error occurred while joining the tournament');
        }

    };
    const enrollClass = (participants.length === 0) ? 'enroll-above' : 'enroll';



    const handleUpdateRound1 = async (round2Draw) => {
        if (tour.status === "closed") {

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tournaments/${id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ round2: round2Draw }),
                });

                if (!response.ok) {
                    throw new Error(`Error updating tournament: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Tournament updated successfully:', data);
                fetchTournamentData();

            } catch (error) {
                console.error('Error updating tournament:', error.message);
            }
        }
    };
    const handleUpdateRound2 = async (round3Draw) => {
        if (tour.status === "closed") {

            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tournaments/${id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ round3: round3Draw }),
                });

                if (!response.ok) {
                    throw new Error(`Error updating tournament: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Tournament updated successfully:', data);
                fetchTournamentData();

            } catch (error) {
                console.error('Error updating tournament:', error.message);
            }
        }
    };
    const handleUpdateRound3 = async (tourWinner) => {
        if (tour.status === "closed") {

            console.log("winner :", tourWinner)
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/tournaments/${id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ winner: tourWinner }),
                });

                if (!response.ok) {
                    throw new Error(`Error updating tournament: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Tournament updated successfully:', data);
                fetchTournamentData();

            } catch (error) {
                console.error('Error updating tournament:', error.message);
            }
        }
    };




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
                        <p>{player.username}</p>
                    </div>
                ))}</div>
            )}

            <div className='tour-info'>
                <div className='info-tour'>
                    <p>Status : {tour.status}</p>
                    <p>Date : {tour.day} {tour.time}</p>
                    <p>Place : {tour.place}</p>
                </div>
                {organizer && (
                    <div className='organizer'>
                        <p className='header-org'>Organizer</p>
                        <img src={organizer.picture} alt={organizer.name} />
                        <p>{organizer.username}</p>
                    </div>)
                }

            </div>

            {participants.length > 0 && (
                <Diagram
                    participants={participants}
                    draw={tour.draw}
                    round2={tour.round2}
                    round3={tour.round3}
                    winner={tour.winner}
                />
            )}
            {currentUser &&
                <>
                    {
                        !participants.some(participant => participant._id === currentUser.id) &&
                        (participants.length < 8) &&
                        <div className={enrollClass} onClick={handleJoinTournament}><p>Join now</p></div>
                    }

                    {organizer._id === currentUser.id && (
                        <TournamentBracket
                            participants={participants}
                            draw={tour.draw}
                            round2={tour.round2}
                            round3={tour.round3}
                            winner={tour.winner}
                            handleUpdateRound1={handleUpdateRound1}
                            handleUpdateRound2={handleUpdateRound2}
                            handleUpdateRound3={handleUpdateRound3}
                        />
                    )}
                </>
            }

        </div>
    );
}