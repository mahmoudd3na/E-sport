const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");


//@desc Get all tournaments
//@route GET /tournaments
//@access public
const getTournaments = asyncHandler(async (req, res) => {
    const tournaments = await Tournament.find();
    console.log(tournaments);
    res.status(200).json(tournaments);
});
//@desc Create new tournament
//@route POST /tournaments
//@access private

const createTournament = asyncHandler(async (req, res) => {
    console.log(`the request body is`, req.body);
    const { name, place, day, time, organizer } = req.body;
    if (!name || !place || !day || !time || !organizer) {
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const tournament = await Tournament.create({
        name,
        place,
        day,
        time,
        organizer: req.user.id
    })
    res.status(201).json(tournament);
});
//@desc Get a tournament
//@route GET /tournaments/:id
//@access public

const getTournament = asyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
        res.status(404);
        throw new Error("Tournament not Found")
    }
    res.status(200).json(tournament);
});
//@desc Delete a tournament
//@route DELETE /tournaments/:id
//@access private

const deleteTournament = asyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
        res.status(404);
        throw new Error("Tournament not Found")
    }
    await Tournament.deleteOne();
    res.status(200).json(tournament);
});
//@desc Update a tournament
//@route PUT /tournaments/:id
//@access private

const updateTournament = asyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
        res.status(404);
        throw new Error("Tournament not Found")
    }

    if (tournament.organizer.toString() !== req.user.id) {
        res.status(400);
        throw new Error("You should be an Organizer");
    }
    if (req.body.winner) {
        req.body.status = "ended"
    }
    const updatedTournament = await Tournament.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedTournament)
});

//@desc Join a tournament
//@route PUT /tournaments/:id/join
//@access private

const joinTournament = asyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
        res.status(404);
        throw new Error("Tournament not Found");
    }

    const userToCheck = req.user.id; // Ensure req.user.id is a string
    console.log("req.user.id", req.user.id)
    console.log("tournament user", tournament.users[0])
    // Check if the user ID is already in the array
    if (tournament.users.includes(userToCheck)) {
        res.status(400);
        throw new Error("You are already joined")
        // Add the following line to end the response

    }
    const draw = tournament.draw;

    if (tournament.users.length < 8) {
        const keysWithZeroValue = Object.keys(draw).filter(key => draw[key] === 0);
        if (keysWithZeroValue.length > 0) {
            // Randomly select a key from keysWithZeroValue
            const randomKey = keysWithZeroValue[Math.floor(Math.random() * keysWithZeroValue.length)];

            // Insert the user ID into the selected key
            draw[randomKey] = req.user.id; // Fix: Use req.user.id instead of userId
            tournament.users.push(req.user.id);
            console.log("Insertion successful");
        }
    } else {
        res.status(400);
        throw new Error("Tournament is full");
    }
    if (tournament.users.length === 8) {
        tournament.status = "closed";
    }

    const updatedTournament = await Tournament.findOneAndUpdate(
        { _id: req.params.id },
        tournament,
        { new: true }
    );
    res.status(200).json(updatedTournament);
});

module.exports = { getTournaments, createTournament, getTournament, updateTournament, deleteTournament, joinTournament }