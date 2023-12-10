import React, { useState } from 'react'
import "./style.css"
import { tournaments } from '../constants/tournaments'
import Tournament from '../components/Tournament'


export default function Tournaments() {

  const renderedTournaments = tournaments.map(tournament => {
    if (tournament.status === "open")
      return <Tournament key={tournament.id} data={tournament} />
  });
  return (
    <div className='tour-container'>
      <div className='open-container'>
        <h1 className='tour-header'>Open Tournaments</h1>
        <table className='open-tour'>
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

      <div className='add-results'>
        <div className='add-tournament'>
          <img className="vector-icon" src="/plus.png" />
        </div>
      </div>



    </div>
  )
}
