const axios = require("axios");
const userRepository  = require("../Repositories/userRepository");

// Authenticates a user by their username and email
const authUser = async (username, email) => {
    const { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");

    const user = users.find((user) => user.username === username && user.email === email);
    if (!user) {
        return { success: false, message: "User not found" };
    }

    const dbUser = await userRepository.getUserByUserId(user.id);
    
    if(!dbUser) {
        return { success: false, message: "User not registered" };   
    }

    return { success: true, user: dbUser };
}

module.exports = { authUser };