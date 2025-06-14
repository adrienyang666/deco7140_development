/**
* IMPORTS
* Keep track of external modules being used
* */
import { logMessage } from "./modules/logging.js";
import { fetchTemperature } from "./modules/temperature.js"; /* new */
/**
* CONSTANTS
* Define values that don't change e.g. page titles, URLs, etc.
* */
const PAGE_NAME = "components.js";

/**
* VARIABLES
* Define values that will change e.g. user inputs, counters, etc.
* */
let message = "Page has fully loaded";

/**
* FUNCTIONS
* Group code into functions to make it reusable
* */

/**
* EVENT LISTENERS
* The code that runs when a user interacts with the page
* */

// when the page fully loads
import { fetchTemperature } from "./modules/temperature.js";

window.addEventListener("load", () => {
    console.log("🌎 Page fully loaded. Calling fetchTemperature()...");
    fetchTemperature();
});

