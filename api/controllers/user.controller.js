import userService from '../services/user.services.js';

const register = async (req, res) => {
    console.log("Registering user:", req.body);

    if (!req.body || !req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ message: 'Username, password and email required' });
    }

    try {
        const savedUser = await userService.registerUser(req.body);
        console.log("Saved user:", savedUser);
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user: ${error}` });
    }
};

export default { register };