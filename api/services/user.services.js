import bcrypt from 'bcrypt';
import User from '../models/User.js';

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

export default { registerUser };