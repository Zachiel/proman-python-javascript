import {boardsManager} from "./controller/boardsManager.js";

function init() {
    //boardsManager.loadBoards();
    document.querySelector('.board__add-card-button').addEventListener('click', ()=>{alert('test')});
    console.log('ready');
}
window.onload=()=>{init()};


