const userModel = require("../Models/userModel");

// Fetches all users from the database
const getAllUsers = async () => {
    const users = await userModel.find({});

    return users;
}

// Fetches a user by their unique userId
const getUserByUserId = async (userId) => {
    const user = await userModel.findOne({ userId: userId });

    return user;
}

module.exports = { getAllUsers, getUserByUserId };