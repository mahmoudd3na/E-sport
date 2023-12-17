import React from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
// remove this constant after finishing the project
export default function Diagram({ participants, draw, round2, round3, winner }) {
    // var randomFloat = Math.random();
    // var randomInteger = Math.floor(Math.random() * (b - a + 1)) + a;
    let renderedDiagram = [];
    let renderedRound2 = [];
    let renderedRound3 = [];
    let renderedWinner;

    // draw[key] is the id of the user



    for (let key in draw) {
        if (draw[key] === 0) {
            renderedDiagram.push(<div class={`team user-${key}`}>{`${key.toUpperCase()}`}</div>);
        }
        else {
            //here we are gonna put the fetched data of the user
            let user = participants.find(user => user.id === draw[key]);
            renderedDiagram.push(<div class={`team user-${key} filled`}>
                <img src={user.picture} />
            </div>);
        }
    }

    // drawing round 2 
    if (Object.keys(round2).length !== 0) {
        let i = 1;
        for (let key in round2) {
            if (round2[key] !== 0) {
                let user = participants.find(user => user.id === round2[key]);
                renderedRound2.push(<div class={`team user-${i}`}>
                    <img src={user.picture} />
                </div>);
                i++;
            }
        }
        if (Object.keys(round3).length !== 0) {
            let i = 1;
            for (let key in round3) {
                if (round3[key] !== 0) {
                    let user = participants.find(user => user.id === round3[key]);
                    renderedRound3.push(<div class={`team final-${i}`}>
                        <img src={user.picture} />
                    </div>);
                    i++;
                }

            }
        }
        if (winner !== 0) {

            let user = participants.find(user => user.id === winner);
            renderedWinner = (
                <div>
                    <div class={`team winner`}>
                        <img src={user.picture} />
                    </div>
                    <p className='winner-name'>{user.name}</p>
                </div>
            );
        }




    }

    return (
        <>
            <img className="diagram" src="/diagramtrans.png" />
            <div class="tournament-diagram">
                {renderedDiagram}

                {Object.keys(round2).length !== 0 &&
                    renderedRound2
                }

                {Object.keys(round3).length !== 0 &&
                    <div>
                        {renderedRound3}
                    </div>
                }
                <p className='final-match'>The Final</p>
                {
                    winner !== 0 &&
                    <div>
                        <p className='winner-header'>Winner</p>
                        {renderedWinner}
                    </div>
                }




            </div>
            {/* should check if this user is enrolled or not ,if the id of the user is in the tournament participants the enroll button shouldn't be displayed */}
            {
                (participants.length < 8) &&
                <div className='enroll'><p>Join now</p></div>
            }

        </>

    )
}
