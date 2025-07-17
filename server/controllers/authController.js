const User = require("../models/user");

//Register a user

const registerUser = async (req, res) =>{
    try{
        const {name, email, password, role}= req.body;

        //check if exits already    
        const existingUser = await User.findOne({ email });
        if (existingUser){
            return res.status(400).json({ message: "Email already registered" });
        }

        //create new user
        const newUser = new User({
            name,
            email,
            password,
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

        //check password

        const user = await User.findOne({email});
        if(!user || user.password != password){
            return res.status(400).json({message: "Invalid credentials"});
        };

        res.json({
            message: "Login successfully",
            user: {
                id: user._id,
                name: user.name,
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