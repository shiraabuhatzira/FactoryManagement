const path = require('path');
const jFile = require('jsonfile');

// Logs a user's action to a JSON file
const logAction = async (userId, maxActions, actionsPerformed) => {
    // Define the path to the log file
    const logFilePath = path.join(__dirname, '../actionLogs.json');

    // Create a log entry object
    const logEntry = {
        id: userId,
        maxActions: maxActions,
        date: new Date().toISOString().split('T')[0], // Log date in `YYYY-MM-DD` format
        actionAllowed: maxActions - actionsPerformed // Remaining actions
    };

    try {
        let logData;

        // Attempt to read the log file
        try {
            logData = await jFile.readFile(logFilePath);

            // Ensure the log file contains a valid structure
            if (!logData || !Array.isArray(logData.actions)) {
                logData = { actions: [] }; // Initialize structure if invalid
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                 // If file doesn't exist, initialize with an empty structure
                logData = { actions: [] };
            } else {
                throw err; // Re-throw unexpected errors
            }
        }

        // Add the new action log entry to the actions array
        logData.actions.push(logEntry);

        // Write the updated log data back to the file
        await jFile.writeFile(logFilePath, logData, { spaces: 2 });
    } catch (err) {
        // Handle errors related to file operations or JSON processing
        console.error('Error logging action:', err);
    }
};

module.exports = { logAction };
