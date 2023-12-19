import React from 'react';
import { Link } from 'react-router-dom';
import './Tournament.css';

export default function Tournament({ data }) {
    return (
        <tr>
            <td className='td-name'>
                <Link to={`/Tournaments/${data._id}`}>{data.name}</Link>
            </td>
            <td className='td-parti'>
                <Link to={`/Tournaments/${data._id}`}>{`${data.users.length}/8`}</Link>
            </td>
            <td>
                <Link to={`/Tournaments/${data._id}`}>{data.place}</Link>
            </td>
            <td>
                <Link to={`/Tournaments/${data._id}`}>{data.time}</Link>
            </td>
        </tr>
    );
}
