'use strict';
import {dataHandler} from "../data/dataHandler.js";
import {showMessage} from './messages.js';

export const usersHandler = {
    register_event: (e) => {
        e.preventDefault();
        const user = {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        }
        const result = dataHandler.registerUser(JSON.stringify(user));

        result.then(response => showMessage(`${response['message']}`, response['success']?'success':'error'));
    },
}
