const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "employee" }]
});

const departmentModel = mongoose.model("department", departmentSchema);

module.exports = departmentModel;