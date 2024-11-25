const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const actionLogger = require("../Services/actionLogger"); 

/**
 * Middleware to check user action limits based on their daily allowed actions.
 *
 * This middleware performs the following:
 * 1. Validates the provided JWT token.
 * 2. Fetches the user based on the token's `userId`.
 * 3. Resets the user's daily action count if the last recorded action was on a previous day.
 * 4. Ensures the user has not exceeded their daily action limit.
 * 5. Logs the user's action after processing the request.
 *
 * If any validation fails, an appropriate HTTP error response is returned.
 */
const checkActionMiddleware = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({message: "No token provided"});
    }
    
    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, "secret");
        const userId = decoded.userId;

        const user = await userModel.findOne({ userId });

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const today = new Date().toISOString().split('T')[0]; //`YYYY-MM-DD` format
        const lastActionDate = user.lastActionDate ? user.lastActionDate.toISOString().split('T')[0] : null;

        // Reset the user's daily action count if their last action was on a previous day.
        if (lastActionDate !== today) {
            user.actionsPerformed = 0;
            user.lastActionDate = new Date();
        }

        // Check if the user has exceeded their daily action limit.
        if (user.actionsPerformed >= user.numOfActions) {
            return res.status(403).json({ message: "Action limit exceeded. Try again tomorrow." });
        }

        // Increment the user's actions performed and update their last action date.
        user.actionsPerformed += 1;
        user.lastActionDate = new Date();
        await user.save();

        req.userId = userId;
        next();

        // Log the action after the request has been processed
        await actionLogger.logAction(userId, user.numOfActions, user.actionsPerformed);
    } catch (err) {
         // If the token is invalid or another error occurs, return a 401 Unauthorized error
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = checkActionMiddleware;