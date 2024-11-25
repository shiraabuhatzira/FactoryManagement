const departmentRepository = require("../Repositories/departmentRepository");
const employeeRepository = require("../Repositories/employeeRepository"); 

// Fetches all departments from the database
const getAllDepartments = async () => {
    const departments = await departmentRepository.getAllDepartments();

    return departments;
}

// Fetches a department by its unique identifier
const getDepartmentById = async (departmentId) => {
    const department = await departmentRepository.getDepartmentById(departmentId);

    return department;
}

// Creates a new department in the database
const createDepartment = async (department) => {
    const newDepartment = await departmentRepository.createDepartment(department);

    return newDepartment;
}

// Updates an existing department by its unique identifier
const updateDepartment = async (id, newData) => {
    const department = await departmentRepository.updateDepartment(id, newData);

    return department;
}

// Deletes a department by its unique identifier
const deleteDepartment = async (id) => {
    const department = await departmentRepository.deleteDepartment(id);
    
    return department;
}

// Adds an employee to a department's employee list
const addEmployeeToDepartment = async (departmentId, employeeId) => {
    // Get the department by ID
    const department = await departmentRepository.getDepartmentById(departmentId);
    if (!department) {
        return { success: false, message: "Department not found" }; 
    } 

    // Get the employee by ID
    const employee = await employeeRepository.getEmployeeById(employeeId);
    if (!employee) {
        return { success: false, message: "Employee not found" };
    }

    // Add the employee to the department's employees array
    await departmentRepository.addEmployeeToDepartment(departmentId, employeeId);

    // Re-fetch the department to get the updated employees array
    const updatedDepartment = await departmentRepository.getDepartmentById(departmentId);

    return { success: true, department: updatedDepartment };
};

module.exports = { getAllDepartments, getDepartmentById, createDepartment,updateDepartment, deleteDepartment, addEmployeeToDepartment };