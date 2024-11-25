const express = require("express");
const jwt = require("jsonwebtoken");
const authService = require("../Services/authService");

const router = express.Router();

/**
 * Login Route
 * 
 * - Authenticates the user based on username and email.
 * - Generates a JWT token upon successful authentication.
 * - Resets the `actionsPerformed` field if the last action was performed on a different day.
 */
router.post("/login", async (req, res) => {
    const { username, email } = req.body;
     
    const result = await authService.authUser(username, email);
    
    if (!result.success) {
        return res.json({ success: false, message: result.message });
    }

    const today = new Date().toISOString().split('T')[0]; //`YYYY-MM-DD` format
    const lastActionDate = result.user.lastActionDate ? result.user.lastActionDate.toISOString().split('T')[0] : null;

    // Reset actionsPerformed if the last action was on a different day
    if (lastActionDate !== today) {
        result.user.actionsPerformed = 0;
        result.user.lastActionDate = new Date();
    }

    const maxActionsReached = result.user.actionsPerformed >= result.user.numOfActions;

    const token = jwt.sign({ userId: result.user.userId }, "secret");

    return res.json({
        success: true,
        token,
        user: result.user,
        maxActionsReached
    });
});

module.exports = router;

