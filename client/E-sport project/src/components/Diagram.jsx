import React from 'react'
import { users } from '../constants/users'
import { Link } from 'react-router-dom';
// remove this constant after finishing the project
export default function Diagram({ draw }) {
    // var randomFloat = Math.random();
    // var randomInteger = Math.floor(Math.random() * (b - a + 1)) + a;
    let renderedDiagram = [];
    // draw[key] is the id of the user
    for (let key in draw) {
        if (draw[key] === 0) {
            renderedDiagram.push(<div class={`team user-${key}`}>{`${key.toUpperCase()}`}</div>);
            // console.log(user);
        }
        else {
            //here we are gonna put the fetched data of the user
            let user = users.find(user => user.id === draw[key]);
            renderedDiagram.push(<div class={`team user-${key} filled`}>
                <img src={user.picture} />
            </div>);
        }
    }

    return (
        <>
            <img className="diagram" src="/diagramtrans.png" />
            <div class="tournament-diagram">
                {renderedDiagram}
            </div>
            {/* should check if this user is enrolled or not ,if the id of the user is in the tournament participants the enroll button shouldn't be displayed */}
            {

                <div className='enroll'><p>Join now</p></div>
            }

        </>

    )
}
