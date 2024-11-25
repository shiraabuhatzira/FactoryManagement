const express = require("express"); 
const checkActionMiddleware = require("../Middlewares/checkActionMiddleware");
const departmentService = require("../Services/departmentService");

const router = express.Router();

router.use(checkActionMiddleware);

// Get All Departments
router.get("/", async (req, res) => {
    const departments = await departmentService.getAllDepartments();

    return res.json(departments);
});

// Get Department by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    
    const department = await departmentService.getDepartmentById(id);

    return res.json(department);
});

// Create a New Department
router.post("/", async (req, res) => {
    const department = req.body;

    const newDepartment = await departmentService.createDepartment(department);

    return res.json(newDepartment);
});

// Add an Employee to a Department
router.post("/:id/employees", async (req, res) => {
    const id = req.params.id;
    const employeeId = req.body.employeeId;

    const result = await departmentService.addEmployeeToDepartment(id, employeeId);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    return res.json(result.department);
});

// Update a Department
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const department = await departmentService.updateDepartment(id, newData);

    return res.json(department);
});

// Delete a Department
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const department = await departmentService.deleteDepartment(id);

    return res.json(department);
});

module.exports = router;


