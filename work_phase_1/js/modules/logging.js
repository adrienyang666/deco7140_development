/**
 * module:logging
 * generic logging using console.log
 */

function logMessage(pageName, message) {
    console.log(`From ${pageName}: ${message}`);
}

export { logMessage };
