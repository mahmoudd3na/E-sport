import React from 'react'
import "./Tournament.css";
import { Link } from 'react-router-dom';


export default function Tournament({ data }) {
    return (

        <tr>
            <td> <Link to={`/Tournaments/${data.id}`}>{data.name}</Link></td>
            <td>{data.id}</td>
            <td>{data.place}</td>
            <td>{data.time}</td>
        </tr>

    )
}
