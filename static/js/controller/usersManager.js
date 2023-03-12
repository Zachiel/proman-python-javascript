'use strict';
import {dataHandler} from "../data/dataHandler.js";
import {showMessage} from './messages.js';

export const usersHandler = {
    registerEvent: (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const result = dataHandler.registerUser(user);

        result.then(response => showMessage(`${response['message']}`, response['success']?'success':'error'));
    },
    loginEvent: (e) =>{
        e.preventDefault();
        const login = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const result = dataHandler.loginUser(login);
        result.then(response =>{
                if (response['success'])
                {
                    showMessage(`${response['message']}`, 'success',1000);
                    setTimeout(()=>{window.location = '/';},1100);
                }
                else{
                    showMessage(`${response['message']}`, 'error');
                }
            }
        )
    },
    checkAccountEvent: e=> {
        showMessage(`You're logged in as: ${e.currentTarget.dataset.username}`);
    }
}
