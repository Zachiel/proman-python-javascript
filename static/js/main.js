import { boardsManager } from "./controller/boardsManager.js";
import { cardsModal } from "./controller/cardsManager.js";

function init() {
    boardsManager.loadBoards();
    cardsModal();
}
window.onload = () => {
    init();
};
