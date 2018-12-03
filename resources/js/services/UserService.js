import axios from "axios";

export default class UserService {

    /**
     * method to handle login of user
     * 
     * @param {array} data 
     */
    login(data) {

        return axios.post('/api/login',data)
        .then((response)=>{
            if (response.status==200){
                localStorage.setItem('fundootoken',response.data.token);
            return response ;
            }
        }
        ).catch((error)=>{
            console.log('rereerrors',error);
            return error;
        });

    }

    /**
     * method to handle register service
     * 
     * @param {array} data 
     */
    register(data) {

        //console.log("helo",data);
        // var headers={
        //     'Content-Type': 'application/json',
        // }
        return axios.post('/api/register', data)
            .then((response) => {
                console.log("respspspsp", response);
                return response;
            }
            ).catch((error) => {
                console.log('errors', error);
                return error;
            });

    }

    getUserData(){
        return axios.post('/api/userdetails', data)
        .then((response) => {
            console.log("detdet", response);
            return response;
        }
        ).catch((error) => {
            console.log('errors', error);
            return error;
        });
    }
}