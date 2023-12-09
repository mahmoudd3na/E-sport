import React from 'react'
import "./style.css"
import { tournaments } from '../constants/tournaments'
import Tournament from '../components/Tournament'

export default function Tournaments() {
  const renderedTournaments = tournaments.map(tournament => {
    <Tournament data={tournament} />
  });
  return (
    <div className='container'>
      <div>
        <h1 className='header1'>Latest Tournaments</h1>
        {renderedTournaments}
      </div>



    </div>
  )
}
