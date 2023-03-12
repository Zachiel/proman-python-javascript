import {boardsManager} from "./controller/boardsManager.js";
import {cardsModal} from "./controller/cardsManager.js";
import {usersHandler} from './controller/usersManager.js';
import {cardsManager} from "./controller/cardsManager.js";


function init() {
    boardsManager.loadBoards();
    cardsModal();
    document.querySelector('#registration-form').addEventListener('submit', usersHandler.registerEvent);
    document.querySelector('#login-form').addEventListener('submit', usersHandler.loginEvent);
    const accountButton = document.querySelector('.header__button--account');
    if (accountButton) {
        accountButton.addEventListener('click', usersHandler.checkAccountEvent);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


window.onload = () => {
    init()

};
