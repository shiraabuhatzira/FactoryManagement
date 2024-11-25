const express = require("express");
const cors = require("cors");

require("./Configs/database");

const authController = require("./Controllers/authController");
const userController = require("./Controllers/userController");
const departmentController = require("./Controllers/departmentController");
const employeeController = require("./Controllers/employeeController");
const shiftController = require("./Controllers/shiftController");

const app = express();

// Will parse JSON sent in the body request
app.use(express.json());
app.use(cors());

app.use("/auth", authController);
app.use("/users", userController);
app.use("/departments", departmentController);
app.use("/employees", employeeController);
app.use("/shifts", shiftController);

app.listen(8000, () => {
    console.log("Server is running at http://127.0.0.1:8000");
});
