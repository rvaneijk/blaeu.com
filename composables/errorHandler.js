/**
 * @module composables/errorHandler
 * @description Centralized error handling utility for the application.
 * Provides consistent error logging, formatting, and user notifications
 * with different severity levels (error, warning, info, debug).
 * @author Blaeu Privacy Response Team
 * @version 1.0.0
 */
import { reactive } from 'vue';

/**
 * @typedef {Object} ErrorLogEntry
 * @property {string} id - Unique identifier for the error
 * @property {string} level - Error severity level ('error', 'warning', 'info', 'debug')
 * @property {string} message - Human-readable error message
 * @property {Object|null} details - Additional error details or original Error object
 * @property {string} component - Component where the error occurred
 * @property {Date} timestamp - When the error occurred
 */

/**
 * @typedef {Object} ErrorHandlerOptions
 * @property {boolean} logToConsole - Whether to log errors to console
 * @property {boolean} showToUser - Whether to show errors to the user via announcements
 * @property {boolean} trackErrors - Whether to keep errors in the central log
 * @property {number} maxLogEntries - Maximum number of errors to keep in the log
 */

/**
 * Default options for the error handler
 * @type {ErrorHandlerOptions}
 */
const defaultOptions = {
  logToConsole: process.env.NODE_ENV !== 'production',
  showToUser: true,
  trackErrors: true,
  maxLogEntries: 100
};

/**
 * Reactive state containing the error log and settings
 * @type {Object}
 */
const state = reactive({
  errorLog: [],
  options: { ...defaultOptions }
});

/**
 * Generate a unique error ID
 * @returns {string} Unique identifier
 */
const generateErrorId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

/**
 * Format error message with consistent structure
 * @param {string} message - Error message
 * @param {Object} details - Error details
 * @param {string} component - Component where the error occurred
 * @returns {string} Formatted error message
 */
const formatErrorMessage = (message, details, component) => {
  let formattedMessage = message;
  
  if (component) {
    formattedMessage = `[${component}] ${formattedMessage}`;
  }
  
  // Add error code if available
  if (details && details.code) {
    formattedMessage = `${formattedMessage} (Code: ${details.code})`;
  }
  
  return formattedMessage;
};

/**
 * Get the announce function from the Nuxt app if available
 * @returns {Function|null} Announce function or null
 */
const getAnnounce = () => {
  if (process.client) {
    const nuxtApp = useNuxtApp();
    return nuxtApp.$announce || null;
  }
  return null;
};

/**
 * Add entry to error log
 * @param {ErrorLogEntry} entry - Error log entry
 */
const addToErrorLog = (entry) => {
  if (!state.options.trackErrors) return;
  
  state.errorLog.unshift(entry);
  
  // Trim log if it exceeds the maximum size
  if (state.errorLog.length > state.options.maxLogEntries) {
    state.errorLog.length = state.options.maxLogEntries;
  }
};

/**
 * Core error handling function
 * @param {string} level - Error severity level ('error', 'warning', 'info', 'debug')
 * @param {string} message - Error message
 * @param {Object|Error|null} details - Error details or error object
 * @param {Object} options - Additional options
 * @param {string} options.component - Component where the error occurred
 * @param {boolean} options.showToUser - Whether to show the error to the user
 * @param {boolean} options.logToConsole - Whether to log the error to console
 * @returns {string} Error ID
 */
const handleError = (level, message, details = null, options = {}) => {
  const errorOptions = {
    component: options.component || 'unknown',
    showToUser: options.showToUser !== undefined ? options.showToUser : state.options.showToUser,
    logToConsole: options.logToConsole !== undefined ? options.logToConsole : state.options.logToConsole
  };
  
  // Extract message from Error object if provided
  let errorMessage = message;
  let errorDetails = details;
  
  if (details instanceof Error) {
    errorDetails = {
      name: details.name,
      message: details.message,
      stack: details.stack,
      ...(details.cause ? { cause: details.cause } : {})
    };
  }
  
  // Format the message
  const formattedMessage = formatErrorMessage(errorMessage, errorDetails, errorOptions.component);
  
  // Create error entry
  const errorId = generateErrorId();
  const errorEntry = {
    id: errorId,
    level,
    message: errorMessage,
    details: errorDetails,
    component: errorOptions.component,
    timestamp: new Date()
  };
  
  // Log to console if enabled
  if (errorOptions.logToConsole && process.client) {
    switch (level) {
      case 'error':
        console.error(formattedMessage, errorDetails);
        break;
      case 'warning':
        console.warn(formattedMessage, errorDetails);
        break;
      case 'info':
        console.info(formattedMessage, errorDetails);
        break;
      case 'debug':
        console.debug(formattedMessage, errorDetails);
        break;
      default:
        console.log(formattedMessage, errorDetails);
    }
  }
  
  // Show to user via announcer if enabled
  if (errorOptions.showToUser && process.client) {
    const announce = getAnnounce();
    if (announce) {
      // Only announce errors and warnings
      if (level === 'error') {
        announce(`Error: ${errorMessage}`, 'assertive');
      } else if (level === 'warning') {
        announce(`Warning: ${errorMessage}`, 'polite');
      }
    }
  }
  
  // Add to error log
  addToErrorLog(errorEntry);
  
  return errorId;
};

/**
 * Update the global error handler options
 * @param {ErrorHandlerOptions} options - New options
 */
const updateOptions = (options = {}) => {
  state.options = {
    ...state.options,
    ...options
  };
};

/**
 * Clear the error log
 */
const clearErrorLog = () => {
  state.errorLog.length = 0;
};

/**
 * Get the current error log
 * @returns {Array<ErrorLogEntry>} Error log
 */
const getErrorLog = () => {
  return [...state.errorLog];
};

/**
 * Log an error message
 * @param {string} message - Error message
 * @param {Object|Error|null} details - Error details
 * @param {Object} options - Additional options
 * @returns {string} Error ID
 */
const error = (message, details = null, options = {}) => {
  return handleError('error', message, details, options);
};

/**
 * Log a warning message
 * @param {string} message - Warning message
 * @param {Object|Error|null} details - Warning details
 * @param {Object} options - Additional options
 * @returns {string} Warning ID
 */
const warning = (message, details = null, options = {}) => {
  return handleError('warning', message, details, options);
};

/**
 * Log an info message
 * @param {string} message - Info message
 * @param {Object|Error|null} details - Info details
 * @param {Object} options - Additional options
 * @returns {string} Info ID
 */
const info = (message, details = null, options = {}) => {
  return handleError('info', message, details, options);
};

/**
 * Log a debug message
 * @param {string} message - Debug message
 * @param {Object|Error|null} details - Debug details
 * @param {Object} options - Additional options
 * @returns {string} Debug ID
 */
const debug = (message, details = null, options = {}) => {
  return handleError('debug', message, details, options);
};

/**
 * Create a component-specific error handler
 * @param {string} componentName - Component name
 * @returns {Object} Component-specific error handler methods
 */
const createComponentHandler = (componentName) => {
  return {
    error: (message, details = null, options = {}) => {
      return error(message, details, { ...options, component: componentName });
    },
    warning: (message, details = null, options = {}) => {
      return warning(message, details, { ...options, component: componentName });
    },
    info: (message, details = null, options = {}) => {
      return info(message, details, { ...options, component: componentName });
    },
    debug: (message, details = null, options = {}) => {
      return debug(message, details, { ...options, component: componentName });
    }
  };
};

/**
 * Try to execute a function and handle any errors
 * @param {Function} fn - Function to execute
 * @param {Object} options - Error handling options
 * @returns {Promise<any>} Result of the function or null if it fails
 */
const tryExec = async (fn, options = {}) => {
  try {
    return await fn();
  } catch (err) {
    error(
      options.message || 'Error executing function',
      err,
      options
    );
    return null;
  }
};

export const errorHandler = {
  error,
  warning,
  info,
  debug,
  getErrorLog,
  clearErrorLog,
  updateOptions,
  createComponentHandler,
  tryExec
};

export default errorHandler;