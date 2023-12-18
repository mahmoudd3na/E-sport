import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

export default function Diagram({
    participants,
    draw,
    round2,
    round3,
    winner
}) {
    let renderedDiagram = [];
    let renderedRound2 = [];
    let renderedRound3 = [];
    let renderedWinner;

    // Winners and Losers for each round
    let round2Winners = [];
    let round3Winners = [];
    let finalWinner;

    for (let key in draw) {
        if (draw[key] === 0) {
            renderedDiagram.push(
                <div class={`team user-${key}`}>{`${key.toUpperCase()}`}</div>
            );
        } else {
            let user = participants.find((user) => user._id === draw[key]);
            if (!user) {
                renderedDiagram.push(
                    <div class={`team user-${key} loading`}>Loading...</div>
                );
            } else {
                renderedDiagram.push(
                    <div class={`team user-${key} filled`}>
                        <img src={user.picture} alt="profile-picture" />
                    </div>
                );
            }
        }
    }

    // drawing round 2
    if (round2 !== null) {
        let i = 1;
        for (let key in round2) {
            if (round2[key] !== 0) {
                let user = participants.find((user) => user._id === round2[key]);
                renderedRound2.push(
                    <div class={`team user-${i}`}>
                        <img src={user.picture} />
                    </div>
                );
                round2Winners.push(user);
                i++;
            }
        }

        if (round3 !== null) {
            let i = 1;
            for (let key in round3) {
                if (round3[key] !== 0) {
                    let user = participants.find((user) => user._id === round3[key]);
                    renderedRound3.push(
                        <div class={`team final-${i}`}>
                            <img src={user.picture} />
                        </div>
                    );
                    round3Winners.push(user);
                    i++;
                }
            }
        }
        // console.log("winner: ", winner)
        // console.log("user_id ", user._id)
        if (winner !== null) {
            let user = participants.find((user) => user._id === winner);

            if (user) {
                finalWinner = (
                    <>
                        <div className={`team winner`}>
                            <img src={user.picture} alt="Winner" />
                        </div>
                        <p className="winner-name">{user.username}</p>
                    </>
                );
            } else {
                // Handle the case when no user is found with the specified _id
            }
        }

    }

    return (
        <>
            <img className="diagram" src="/diagramtrans.png" />
            <div class="tournament-diagram">
                {renderedDiagram}

                {round2 !== null && renderedRound2}

                {round3 !== null && <div>{renderedRound3}</div>}
                <p className="final-match">The Final</p>
                {winner !== null && (
                    <div>
                        <p className="winner-header">Winner</p>
                        {finalWinner}
                    </div>
                )}
            </div>
        </>
    );
}
