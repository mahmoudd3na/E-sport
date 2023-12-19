const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");

connectDb();

const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/tournaments", require("./routes/tournamentRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})