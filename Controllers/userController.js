const express = require("express"); 
const checkActionMiddleware = require("../Middlewares/checkActionMiddleware");
const userService = require("../Services/userService");
 
const router = express.Router();

router.use(checkActionMiddleware);

// Get All Users
router.get("/", async (req, res) => {
    const users = await userService.getAllUsers();

    return res.json(users);
});

module.exports = router;
