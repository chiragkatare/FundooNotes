import axios from "axios";

export default class UserService {

    /**
     * method to send a new note to the backend
     * 
     * @param {array} data 
     */
    sendNote(data) {
        //    / debugger;
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/createnote', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                // debugger
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });

    }

    /**
   * method to get all the notes of the registered user from the backend
   * 
   * @return {array} response
   */
    getNotes() {
        //    / debugger;
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.get('/api/getnotes', { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
  * method to edit the note in the database and return the updated note
  * 
  * @return {array} response
  */
    editNote(note) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/editnote', note, { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
  * method to delete the note from the database and return the status of action
  * 
  * @return {array} response
  */
    deleteNote(note) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/deletenote', note, { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    createLabel(label) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/makelabel', { label: label }, { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
     * 
     */
    deleteLabel(labelid) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/deletelabel', { labelid: labelid }, { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
     * 
     * @param {object} data 
     */
    editLabel(data) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/editlabel', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                return response;
            }
            ).catch((error) => {
                console.log('rereerrors', error);
                return error;
            });
    }

    /**
     * 
     * @param {object} data 
     */
    addNoteLabel(data) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/addnotelabel', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                // debugger;
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
     * 
     * @param {object} data 
     */
    deleteNoteLabel(data) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/deletenotelabel', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                // debugger;
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
     * function to call backend api to add the note to the image
     */
    addNoteImage(data) {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/addnotepic', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                // debugger;
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }

    /**
     * function to call the backend api to delete the note image
     */
    deleteNoteImage() {
        var AuthStr = "Bearer ".concat(localStorage.getItem('fundootoken'));
        return axios.post('/api/deletenotepic', data, { headers: { Authorization: AuthStr } })
            .then((response) => {
                // debugger;
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });
    }



}