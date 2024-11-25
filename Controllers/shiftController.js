const express = require("express");
const checkActionMiddleware = require("../Middlewares/checkActionMiddleware");
const shiftService = require("../Services/shiftService");

const router = express.Router();

router.use(checkActionMiddleware);

// Get All Shifts
router.get("/", async (req, res) => {
    const shifts = await shiftService.getAllShifts();

    return res.json(shifts);
});

// Get Shift by ID
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const shift = await shiftService.getShiftById(id);

    return res.json(shift);
});

// Create a New Shift
router.post("/", async (req, res) => {
    const shift = req.body;

    const newShift = await shiftService.createShift(shift);

    return res.json(newShift);
});

// Add an Employee to a Shift
router.post("/:id/employees", async (req, res) => {
    const id = req.params.id;
    const employeeId = req.body.employeeId;

    const result = await shiftService.addEmployeeToShift(id, employeeId);

    if (!result.success) {
        return res.status(400).json({ message: result.message });
    }

    return res.json(result.shift);
});

// Update a Shift
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const shift = await shiftService.updateShift(id, newData);

    return res.json(shift);
});

module.exports = router;
