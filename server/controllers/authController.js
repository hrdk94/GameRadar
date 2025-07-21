const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Register a user

const registerUser = async (req, res) =>{
    try{
        const {name, username, email, password, role}= req.body;

        //check if exits already    
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            role: role === "developer" ? "pending_developer" : "user",
            createdAt: new Date().toISOString(),
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        console.error("error while registering!", err);
        res.status(500).json({ message: "Server error" });
    }
};

//Login a user
const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body;

        //check email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials:1" });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials:2" });
        }

        res.json({
            message: "Login successfully",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server fault"});
    }
};

module.exports = {
  registerUser,
  loginUser,
};