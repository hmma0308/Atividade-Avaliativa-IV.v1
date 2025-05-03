import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const registerUser = async (userData) => {
    const { username, password, email } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const savedUser = await User.create({
        username,
        password: hashedPassword,
        email
    });
    
    return savedUser;
};

const login = async (req, res) => {
    console.log("Logging in user:", req.body);

    if ( !req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Username and password are required'});
    
    }

    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username }).select('+password');
            if(!user) {
                console.error("User not found:", username);
                return res.status(400).json({ message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match:",isMatch);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid credentials'});
            }
            console.log("User logged in successfully:", user.username);
            
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

            return res.status(200).json({message: 'Login successful', token});

    } catch(error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: `Error logging in user: ${error}`});
    }
}

export default { registerUser, login };