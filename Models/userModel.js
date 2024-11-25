const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    fullName: { type: String, required: true },
    numOfActions: { type: Number, default: 10 },
    actionsPerformed: { type: Number, default: 0 },
    lastActionDate: { type: Date, default: null }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;