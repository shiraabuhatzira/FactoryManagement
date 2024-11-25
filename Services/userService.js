const usersRepository = require("../Repositories/userRepository");

// Fetches all users from the database
const getAllUsers = async () => {
    const users = await usersRepository.getAllUsers();

    return users;
}

module.exports = { getAllUsers };
