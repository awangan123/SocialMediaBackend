const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/error");

const registerController = async (req, res, next) => {
    try {
        const { password, username, email } = req.body;
        
        // Check if password is not empty
        if (!password) {
            throw new CustomError("Password is required", 400);
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new CustomError("Username or email already exists!", 400);
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        console.log("Generated salt:", salt); // Debugging the salt value
        console.log("Password to hash:", password); // Debugging the password value

        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
        console.log("Hashed password:", hashedPassword); // Debugging the hashed password

        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};



const loginController = async (req, res, next) => {
    try {
        let user;
        if (req.body.email) {
            user = await User.findOne({ email: req.body.email });
        } else {
            user = await User.findOne({ username: req.body.username });
        }

        if (!user) {
            throw new CustomError("User not found!", 404);
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            throw new CustomError("Wrong Credentials!", 401);
        }

        const { password, ...data } = user._doc;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie("token", token).status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true })
            .status(200)
            .json("User logged out successfully!");
    } catch (error) {
        next(error);
    }
};

const refetchUserController = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new CustomError("Unauthorized! No token provided.", 401);
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                throw new CustomError("Invalid token!", 403);
            }

            const user = await User.findById(data._id);
            if (!user) {
                throw new CustomError("User not found!", 404);
            }

            res.status(200).json(user);
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerController,
    loginController,
    logoutController,
    refetchUserController,
};
