import React from 'react'
import { useParams } from 'react-router-dom';
import { users } from '../constants/users';
import { tournaments } from '../constants/tournaments';
import "./TourDetails.css";

export default function TourDetails() {

    const { id } = useParams(); // the id of the tournament
    const tour = tournaments.find(tour => tour.id === Number(id));
    console.log(tour);
    const participants = tour.users.map(id => {   //participants are the players that joined the tournament
        return users.find(user => user.id === id);
    });
    const organizer = users.find(user => user.id === tour.organizer);
    console.log(organizer);
    const renderedParticipants = participants.map(player => {
        return <div className='users-participants'>
            <img src={player.picture} />
            <p>{player.name}</p>
        </div>
    })

    return (
        <div className='draw-container'>
            {tour && tour.users.length > 0 ? <h1 className='participant'>Participants </h1> : <h1 className='participant'>No Participants Yet</h1>}
            {participants.length > 0 ? <div className='partici'>{renderedParticipants}</div> : undefined}
            {/* {{ tour.status === "open" ?  }} */}
            <div className='tour-info'>
                <div className='info-tour'>
                    <p>Status : {tour.status}</p>
                    <p>Date : {tour.day} {tour.time}</p>
                    <p>Place : {tour.place}</p>
                </div>
                <div className='organizer'>
                    <p>Organizer</p>
                    <img src={organizer.picture} />
                    <p>{organizer.name}</p>
                </div>
            </div>
            <img className="diagram" src="/diagram.png" />
            <div class="tournament-diagram">

                <div class="match">
                    <div class="team user-a">A</div>
                    <div class="team user-e">E</div>
                </div>
                <div class="match">
                    <div class="team user-b">B</div>
                    <div class="team user-f">F</div>
                </div>
                <div class="match">
                    <div class="team user-c">C</div>
                    <div class="team user-g">G</div>
                </div>
                <div class="match">
                    <div class="team user-d">D</div>
                    <div class="team user-h">H</div>
                </div>

            </div>

        </div>

    );
};