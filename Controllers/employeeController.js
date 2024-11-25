const express = require("express");
const checkActionMiddleware = require("../Middlewares/checkActionMiddleware");
const employeeService = require("../Services/employeeService");

const router = express.Router();

router.use(checkActionMiddleware);

// Get All Employees
router.get("/", async (req, res) => {
    const employees = await employeeService.getAllEmployees();

    return res.json(employees);
});

// Get Employee by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const employee = await employeeService.getEmployeeById(id);

    return res.json(employee);
});

// Create a New Employee
router.post("/", async (req, res) => {
    const employee = req.body;

    const newEmployee = await employeeService.createEmployee(employee);

    return res.json(newEmployee);
});

// Add a Shift to an Employee
router.post("/:employeeId/shifts", async (req, res) => {
    const employeeId = req.params.employeeId;
    const shiftId = req.body.shiftId;

    const result = await employeeService.addShiftToEmployee(employeeId, shiftId);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    return res.json(result.employee);
});
 
// Update an Employee
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const employee = await employeeService.updateEmployee(id, newData);

    return res.json(employee);
});

// Delete an Employee
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const employee = await employeeService.deleteEmployee(id);
    
    return res.json(employee);
});

module.exports = router;
