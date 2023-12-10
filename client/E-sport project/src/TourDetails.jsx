import React from 'react'
import { useParams } from 'react-router-dom';

export default function TourDetails() {
    // Fetch the specific item based on the route parameter
    const { id } = useParams();
    // console.log(match.params.id);
    // Fetch or use the data for the specific item

    return (
        <div>
            <h1>Detail Page</h1>
            {/* Render details for the specific item */}
        </div>
    );
};