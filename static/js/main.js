
import {boardsManager} from "./controller/boardsManager.js";
import {cardsModal} from "./controller/cardsManager.js";
import {usersHandler} from './controller/usersManager.js';


function init() {
    boardsManager.loadBoards();
    cardsModal();
    document.querySelector('#registration-form').addEventListener('submit', usersHandler.register_event);
}


window.onload = () => {
    init()
};