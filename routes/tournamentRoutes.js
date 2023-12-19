const express = require("express");
const router = express.Router();
const {
    getTournaments,
    getTournament,
    createTournament,
    updateTournament,
    deleteTournament,
    joinTournament

} = require("../controllers/tournamentController");
const validateToken = require("../middleware/validateToken");

router.route("/").get(getTournaments).post(validateToken, createTournament);

router.route("/:id")
    .get(getTournament)
    .put(validateToken, updateTournament)
    .delete(validateToken, deleteTournament);
router.route("/:id/join").put(validateToken, joinTournament);



module.exports = router