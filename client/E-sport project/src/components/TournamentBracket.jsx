import React, { useEffect, useState } from 'react';
import "./TournamentBracket.css"

const TournamentBracket = ({ participants, draw, round2, round3, winner, handleUpdateRound1, handleUpdateRound2, handleUpdateRound3 }) => {
    const [round1Matches, setRound1Matches] = useState({
        match1: { player1: 'a', player2: 'b', winner: null },
        match2: { player1: 'c', player2: 'd', winner: null },
        match3: { player1: 'e', player2: 'f', winner: null },
        match4: { player1: 'g', player2: 'h', winner: null },
    });
    const [round2Matches, setRound2Matches] = useState(null);
    const [round3Matches, setRound3Matches] = useState(null);

    useEffect(() => {
        if (round2) {
            console.log(round2);
            const keysArray = Object.keys(round2);
            setRound2Matches({
                match1: { player1: keysArray[0], player2: keysArray[1], winner: null },
                match2: { player1: keysArray[2], player2: keysArray[3], winner: null },
            });
        }
    }, [])
    useEffect(() => {
        if (round3) {
            console.log(round2);
            const keysArray = Object.keys(round3);
            setRound3Matches({
                match1: { player1: keysArray[0], player2: keysArray[1], winner: null },
            });
        }
    }, [])




    const updateWinner = (matchId, winner) => {
        setRound1Matches((prevMatches) => ({
            ...prevMatches,
            [matchId]: { ...prevMatches[matchId], winner },
        }));
    };
    const updateWinner2 = (matchId, winner) => {
        setRound2Matches((prevMatches) => ({
            ...prevMatches,
            [matchId]: { ...prevMatches[matchId], winner },
        }));
        console.log(round2Matches)
    };
    const updateWinner3 = (matchId, winner) => {
        setRound3Matches((prevMatches) => ({
            ...prevMatches,
            [matchId]: { ...prevMatches[matchId], winner },
        }));
    };

    const handleSubmit = () => {
        const winnersData = Object.values(round1Matches).map((match) => ({
            [match.winner]: draw[match.winner],
        }));
        const flattenedObject = winnersData.reduce((result, obj) => {
            return { ...result, ...obj };
        }, {});
        console.log(flattenedObject);
        handleUpdateRound1(flattenedObject);
    }
    const handleSubmit2 = () => {
        const winnersData = Object.values(round2Matches).map((match) => ({
            [match.winner]: draw[match.winner],
        }));
        const flattenedObject = winnersData.reduce((result, obj) => {
            return { ...result, ...obj };
        }, {});
        console.log(flattenedObject);
        handleUpdateRound2(flattenedObject);
    }
    const handleSubmit3 = () => {
        const winnersData = Object.values(round3Matches).map((match) => ({
            [match.winner]: draw[match.winner],
        }));
        const flattenedObject = winnersData.reduce((result, obj) => {
            return { ...result, ...obj };
        }, {});
        const valuesArray = Object.values(flattenedObject);
        handleUpdateRound3(valuesArray[0]);
    }
    return (
        <>
            {
                round2 === null &&
                <>
                    <div className='bracket-container'>
                        {Object.entries(round1Matches).map(([matchId, match]) => (
                            <div key={matchId} className='match-container'>
                                <p>{`${matchId}: ${match.player1} vs ${match.player2}`}</p>
                                <p>{`Winner: ${match.winner || 'Undecided'}`}</p>
                                <button onClick={() => updateWinner(matchId, match.player1)}>Select {match.player1}</button>
                                <button onClick={() => updateWinner(matchId, match.player2)}>Select {match.player2}</button>
                            </div>
                        ))}
                        <button onClick={handleSubmit} className='bracket-btn'>
                            Submit Winners
                        </button>
                    </div>
                </>
            }
            {
                round3 === null && round2Matches &&
                <>
                    <div className='bracket-container'>
                        {Object.entries(round2Matches).map(([matchId, match]) => (
                            <div key={matchId} className='match-container'>
                                <p>{`${matchId}: ${match.player1} vs ${match.player2}`}</p>
                                <p>{`Winner: ${match.winner || 'Undecided'}`}</p>
                                <button onClick={() => updateWinner2(matchId, match.player1)}>Select {match.player1}</button>
                                <button onClick={() => updateWinner2(matchId, match.player2)}>Select {match.player2}</button>
                            </div>
                        ))}
                        <button onClick={handleSubmit2} className='bracket-btn'>
                            Submit Winners
                        </button>
                    </div>
                </>
            }
            {
                round3Matches && winner === null &&
                <>
                    <div className='bracket-container'>
                        {Object.entries(round3Matches).map(([matchId, match]) => (
                            <div key={matchId} className='match-container'>
                                <p>{`${matchId}: ${match.player1} vs ${match.player2}`}</p>
                                <p>{`Winner: ${match.winner || 'Undecided'}`}</p>
                                <button onClick={() => updateWinner3(matchId, match.player1)}>Select {match.player1}</button>
                                <button onClick={() => updateWinner3(matchId, match.player2)}>Select {match.player2}</button>
                            </div>
                        ))}
                        <button onClick={handleSubmit3} className='bracket-btn'>
                            Submit Winners
                        </button>
                    </div>
                </>
            }
        </>

    );
};

export default TournamentBracket;
