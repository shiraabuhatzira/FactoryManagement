const employeeRepository = require("../Repositories/employeeRepository");
const shiftRepository = require("../Repositories/shiftRepository");

// Fetches all employees from the database
const getAllEmployees = async () => {
    const employees = await employeeRepository.getAllEmployees();

    return employees;
}; 

// Fetches an employee by their unique identifier
const getEmployeeById = async (id) => {
    const employee = await employeeRepository.getEmployeeById(id);

    return employee;
};

// Creates a new employee in the database
const createEmployee = async (employee) => {
    const newEmployee = await employeeRepository.createEmployee(employee);

    return newEmployee;
};

// Updates an existing employee by their unique identifier
const updateEmployee = async (id, newData) => {
    const employee = await employeeRepository.updateEmployee(id, newData);

    return employee;
};

// Deletes an employee by their unique identifier
const deleteEmployee = async (id) => {
    const employee = await employeeRepository.deleteEmployee(id);

    return employee;
};

// Adds a shift to an employee's list of shifts
const addShiftToEmployee = async (employeeId, shiftId) => {
    // Get the employee by ID
    const employee = await employeeRepository.getEmployeeById(employeeId);
    if (!employee) {
        return { success: false, message: "Employee not found" };
    }

    // Get the shift by ID
    const shift = await shiftRepository.getShiftById(shiftId);
    if (!shift) {
        return { success: false, message: "Shift not found" };
    }

    // Add the shift to the employee's shifts array
    await employeeRepository.addShiftToEmployeeShifts(employeeId, shiftId);

    // Re-fetch the employee to get the updated shifts array
    const updatedEmployee = await employeeRepository.getEmployeeById(employeeId);

    return { success: true, employee: updatedEmployee };
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, addShiftToEmployee };
