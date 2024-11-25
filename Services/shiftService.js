const shiftRepository = require("../Repositories/shiftRepository");
const employeeRepository = require("../Repositories/employeeRepository");

// Fetches all shifts from the database
const getAllShifts = async () => {
    const shifts = await shiftRepository.getAllShifts();

    return shifts;
};

// Fetches a shift by its unique identifier
const getShiftById = async (id) => {
    const shift = await shiftRepository.getShiftById(id);

    return shift;
};

// Creates a new shift in the database
const createShift = async (shift) => {
    const newShift = await shiftRepository.createShift(shift); 
    
    return newShift;
};

// Updates an existing shift by its unique identifier
const updateShift = async (id, newData) => {
    const shift = await shiftRepository.updateShift(id, newData);

    return shift;
};

// Adds an employee to a shift's list of employees
const addEmployeeToShift = async (shiftId, employeeId) => {
    // Get the shift by ID
    const shift = await shiftRepository.getShiftById(shiftId);
    if (!shift) {
        return { success: false, message: "Shift not found" };
    }

    // Get the employee by ID
    const employee = await employeeRepository.getEmployeeById(employeeId);
    if (!employee) {
        return { success: false, message: "Employee not found" };
    }

    // Add the employee to the shift's employees array
    await shiftRepository.addEmployeeToShift(shiftId, employeeId);

    // Re-fetch the shift to get the updated employees array
    const updatedShift = await shiftRepository.getShiftById(shiftId);

    return { success: true, shift: updateShift };
}

module.exports = { getAllShifts, getShiftById, createShift, updateShift, addEmployeeToShift };
 