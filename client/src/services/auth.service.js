// AUTHENTICATION SERVICE FILE

import api from "./api";
import TokenService from "./token.service";

const register = (firstName, lastName, email, password, confirm)=> {
    api.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
        confirm
    }, {withCredentials:true})
    .then(response => {
        console.log("response when registering!", response);
        if(response.data.errors){
            console.log("The res.data.errors from the model: ", response.data.errors);
        }
        return response.data;
    })
    .catch(err=>console.log("register auth error: ", err));
}

const login = (email, password) => {
    api.post("/auth/login", {
            email,
            password
        }, {withCredentials:true})
        .then(response => {
            console.log("response when logging in!", response);
            if(response.data.errors){
                console.log("The res.data.errors from the model: ", response.data.errors);
                return response.data;
            }
            if (response.data.accessToken) {
            TokenService.setUser(response.data);
            }

            return response.data;
        })
        .catch(err=>console.log("login auth error: ", err));
};

const logout = () => {
    TokenService.removeUser();
};

const getCurrentUser = () => {
    TokenService.getUser();
}


const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;