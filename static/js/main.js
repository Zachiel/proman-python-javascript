import {boardsManager} from "./controller/boardsManager.js";
import {cardsModal} from "./controller/cardsManager.js";

function init() {
    //boardsManager.loadBoards();
    document.querySelector('.board__add-card-button').addEventListener('click', ()=>{alert('test')});
    cardsModal();
    console.log('ready');
}
window.onload=()=>{init()};


