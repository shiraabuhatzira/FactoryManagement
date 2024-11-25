const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startingHour: { type: Number, required: true },
    endingHour: { type: Number, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee" }]
});

const shiftModel = mongoose.model("shift", shiftSchema);

module.exports = shiftModel;
