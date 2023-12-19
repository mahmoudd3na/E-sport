const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//@desc Register a user
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, picture } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        picture: picture
    })
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data not valid");
    }
});

//@desc Login user
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("You should enter both the email and the password");
    }
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60m" }

        );
        res.status(200).json({ accessToken })
    }
    else {
        res.status(401);
        throw new Error("email or password are not valid");
    }
});
//@desc Current user info
//@route GET /users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
//@desc Get a user
// @route GET /users/:id
// @access public

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not Found")
    }
    res.status(200).json(user);
});

module.exports = { registerUser, loginUser, currentUser, getUser }