const employeeModel = require("../Models/employeeModel");

// Fetches all employees from the database with their associated department and shifts
const getAllEmployees = async () => {
    const employees = await employeeModel.find({}).populate("departmentID").populate("shifts");

    return employees;
};

// Fetches an employee by their unique identifier
const getEmployeeById = async (id) => {
    const employee = await employeeModel.findById(id).populate("departmentID").populate("shifts");

    return employee;
};

// Creates a new employee in the database
const createEmployee = async (employee) => {
    const newEmployee = new employeeModel(employee);
    await newEmployee.save();

    return newEmployee;
};

// Updates an existing employee by their unique identifier
const updateEmployee = async (id, newData) => {
    const employee = await employeeModel.findByIdAndUpdate(id, newData, { new: true });
    
    return employee; 
};

// Deletes an employee by their unique identifier
const deleteEmployee = async (id) => {
    const employee = employeeModel.findByIdAndDelete(id);

    return employee;
};

// Adds a shift to an employee's list of shifts
const addShiftToEmployeeShifts = async (employeeId, shiftId) => {
    const employee = await employeeModel.findById(employeeId);
    if (!employee.shifts.includes(shiftId)) {
        employee.shifts.push(shiftId);
        await employee.save();
    }

    return await employeeModel.findById(employeeId).populate("departmentID").populate("shifts");
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, addShiftToEmployeeShifts };