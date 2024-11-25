const shiftModel = require("../Models/shiftModel");

// Fetches all shifts from the database with their associated employees
const getAllShifts = async () => {
    const shifts = await shiftModel.find({}).populate("employees");

    return shifts;
};

// Fetches a shift by its unique identifier
const getShiftById = async (id) => {
    const shift = await shiftModel.findById(id).populate("employees");

    return shift;
};

// Creates a new shift in the database
const createShift = async (shift) => {
    const newShift = new shiftModel(shift);
    await newShift.save();

    return newShift;
};

// Updates an existing shift by its unique identifier
const updateShift = async (id, newData) => {
    const shift = await shiftModel.findByIdAndUpdate(id, newData, { new: true }); 
    
    return shift;
}; 

// Adds an employee to a shift's list of employees
const addEmployeeToShift = async (shiftId, employeeId) => {
    const shift = await shiftModel.findById(shiftId);
    if (!shift.employees.includes(employeeId)) {
        shift.employees.push(employeeId);
        await shift.save();
    }

    return await shiftModel.findById(shiftId).populate("employees");
}

module.exports = { getAllShifts, getShiftById, createShift, updateShift, addEmployeeToShift };
