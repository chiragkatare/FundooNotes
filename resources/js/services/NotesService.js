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
                return response;
            }
            ).catch((error) => {
                // /console.log('rereerrors',error);
                return error;
            });

    }

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


}