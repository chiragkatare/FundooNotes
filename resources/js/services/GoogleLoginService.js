import axios from "axios";

export default class GoogleService {

    googlelogin = () => {

        window.gapi.load('auth2', () => {
            const params = {
                // code: 'code',
                client_id: "60951969533-55ke30c1qr847b09ghbc8avnel7m6u27.apps.googleusercontent.com",
                cookie_policy:'http://localhost:8000/login',
                fetch_basic_profile: true,
                // openid_realm:"true",
                // discoveryDocs:'https://developers.google.com/discovery/v1/using',
                ux_mode: 'popup',
                redirect_uri: "http://localhost:8000/dashboard",
                // access_type: 'online'
                // scope: 'chirag'
            }
            const auth2 = window.gapi.auth2.getAuthInstance(params).signIn();
            console.log("zsgdjgshjdghjsgdhjgsjgd",auth2);
            console.log('hello', auth2.getBasicProfile());

        });

    }
}