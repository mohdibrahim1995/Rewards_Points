// src/utils/logger.js
import log from 'loglevel';

// Setting the default log level
log.setLevel('info'); // Set it to 'info' for general logging or 'warn'/'error' for production

export const logger = log;

// For production, you can limit the logs:
if (process.env.NODE_ENV === 'production') {
    log.disableAll(); // This disables logging for production
}
