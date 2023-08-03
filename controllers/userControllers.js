import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";


// @desc Register a new user
// @route POST /api/users/
// @access PUBLIC

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check user already exist
        const userExists = await User.findOne({ email });

        // if user exists throw error
        if(userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // create salt & hash for new user
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // create new user 
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        // check user created successfully in database
        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.log(error.message);
    }
}


// @desc Auth users/set token
// @route POST /api/users/auth
// @access PUBLIC


const authUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    // if user not exists throw error
    if (!userExists) {
        res.status(401);
        throw new Error("Invalid email or password");
    }

    // if user exists match password
    const matchPassword = await bcrypt.compare(password, userExists.password);

    if (matchPassword) {
        generateToken(res, userExists._id);
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}


// @desc Logout user
// @route POST /api/users/logout
// @access PUBLIC

const logoutUser = async (req, res) => {
    // destroy cookie
    res.cookie("proton_tech", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "User Logged out"});
}

export { registerUser, authUser, logoutUser };