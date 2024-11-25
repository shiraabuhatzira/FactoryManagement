const departmentModel = require("../Models/departmentModel");

// Fetches all departments from the database with their associated manager and employees
const getAllDepartments = async () => {
    const departments = await departmentModel.find({}).populate("manager").populate("employees"); 

    return departments;
}

// Fetches a department by its unique identifier
const getDepartmentById = async (departmentId) => {
    const department = await departmentModel.findById(departmentId).populate("manager").populate("employees");

    return department;
}

// Creates a new department in the database
const createDepartment = async (department) => {
    if (department.manager === "") {
        department.manager = null;
    }
    const newDepartment = new departmentModel(department);
    await newDepartment.save();

    return newDepartment;
}

// Updates an existing department by its unique identifier
const updateDepartment = async (id, newData) => {
    if (newData.manager === "") {
        newData.manager = null;
    }
    const department = await departmentModel.findByIdAndUpdate(id, newData, { new: true });

    return department;
}

// Deletes a department by its unique identifier
const deleteDepartment = async (id) => {
    const department = await departmentModel.findByIdAndDelete(id);

    return department;
}

// Adds an employee to a department's employee list
const addEmployeeToDepartment = async (departmentId, employeeId) => {
    const department = await departmentModel.findById(departmentId);
    if (!department.employees.includes(employeeId)) {
        department.employees.push(employeeId);
        await department.save();
    }
    
    return await departmentModel.findById(departmentId).populate("manager").populate("employees");
}

module.exports = { getAllDepartments, getDepartmentById, createDepartment,updateDepartment, deleteDepartment, addEmployeeToDepartment };