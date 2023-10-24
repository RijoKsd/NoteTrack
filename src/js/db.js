"use strict";

/**
 * Imports module
 */
import { generateID, findNotebook, findNotebookIndex } from "./utils.js";

// DB Object

let /** {Object} */ notekeeperDB = {};

/**
 * Initializes  a local database. If the data exists in the local storage, it is loaded;
 * Otherwise a new empty database structure is created and stored in the local storage.
 */

const initDB = function () {
  const /** {JSON | undefined } */ db = localStorage.getItem("notekeeperDB");
  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

/**
 * Reads and loads the localStorage data into the global variable `notekeeperDB`.
 */

const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

/**
 * Writes the current state of the global variable `notekeeperDB` to the localStorage.
 */

const writeDB = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

/**
 * Collection of function for performing CRUD operations on the database
 * The database state is managed using global variable and local storage
 * @namespace
 * @property {Object} get - Function for retrieving data from the database
 * @property {Object} add - Function for adding data to the database
 * @property {Object} update - Function for updating data in the database
 * @property {Object} delete - Function for deleting data from the database
 */

export const db = {
  post: {
    /**
     * Adds a new notebook to the database
     *
     * @function
     * @param {string} name - The name of the new notebook
     * @returns {Object} - The newly created notebook object
     */
    notebook(name) {
      readDB();

      const /** {Object} */ notebookData = {
          id: generateID(),
          name,
          notes: [],
        };
      notekeeperDB.notebooks.push(notebookData);
      writeDB();
      return notebookData;
    },
  },

  get: {
    /**
     * Retrieves all notebooks from the database
     *
     * @function
     * @returns {Array} - An array of notebook objects
     */
    notebook() {
      readDB();
      return notekeeperDB.notebooks;
    },
  },
  update: {
    /**
     * Updates the name of a notebook in the database
     *
     * @function
     * @param {string} notebookId = The ID of the notebook to update
     * @param {string} name = The new name for the notebook
     * @returns {Object} The updated notebook object
     */
    notebook(notebookId, name) {
      readDB();

      const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;
      writeDB();
      return notebook;
    },
  },
  delete: {
/**
 * Deletes a notebook from the database
 * 
 * @function
 * @param {string} notebookId  - The ID of the notebook to be deleted
 */

    notebook(notebookId){
      readDB();

      const /**{Number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      notekeeperDB.notebooks.splice(notebookIndex, 1);
       writeDB();
    }
  }
};
