import React from 'react'
import "./style.css"
import { tournaments } from '../constants/tournaments'
import Tournament from '../components/Tournament'

export default function Tournaments() {
  const renderedTournaments = tournaments.map(tournament => {
    return <Tournament key={tournament.id} data={tournament} />
  });
  return (
    <div className='tour-container'>
      <div>
        <h1 className='tour-header'>Latest Tournaments</h1>
        <div className='tags'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Place</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {renderedTournaments}
            </tbody>
          </table>
        </div>
      </div>
      <div className='add-tournament'>
      </div>



    </div>
  )
}
