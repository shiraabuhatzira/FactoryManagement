const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: { type: Number, required: true },
    departmentID: { type: mongoose.Schema.Types.ObjectId, ref: "department" },
    shifts: [{ type: mongoose.Schema.Types.ObjectId, ref: "shift" }]
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = employeeModel;
