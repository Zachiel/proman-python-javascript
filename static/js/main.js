import {boardsManager} from "./controller/boardsManager.js";
import {cardsModal} from "./controller/cardsManager.js";
import {usersHandler} from './controller/usersManager.js';
import {cardsManager} from "./controller/cardsManager.js";


function init() {
    boardsManager.loadBoards();
    cardsModal();
    document.querySelector('#registration-form').addEventListener('submit', usersHandler.register_event);
    document.querySelector('#login-form').addEventListener('submit', usersHandler.login_event);
    const accountButton = document.querySelector('.header__button--account');
    if (accountButton) {
        accountButton.addEventListener('click', usersHandler.account_event);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


window.onload = () => {
    init()

};
