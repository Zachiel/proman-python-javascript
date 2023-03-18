import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { statusesManager } from "./statusesManager.js";
import { cardsManager } from "./cardsManager.js";
import { dragManager } from "./dragHandler.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#boardsAccordion", content);
            domManager.addEventListener(
                `.accordion-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(
                `.board__add-card-button[data-board-id="${board.id}"]`,
                "click",
                cardsManager.addCardEvent
            );
            domManager.addEventListener(
                `input[data-board-id="${board.id}"]`,
                "change",
                updateHandler
            );
            domManager.addEventListener(
                `.button-delete[data-board-id="${board.id}"]`,
                "click",
                deleteHandler
            );
        }
    },
};

async function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    const boardBody = document.querySelector(
        `.row.board__body[data-board-id="${boardId}"]`
    );
    if (boardBody.children.length == 0) {
        await statusesManager.loadStatuses(boardId);
        dragManager.initDragElements();
    }
}

async function updateHandler() {
    dataHandler.updateBoard({
        title: this.value,
        is_private: this.dataset.boardPrivate,
        id: parseInt(this.dataset.boardId),
    });
}

async function deleteHandler() {
    await dataHandler.deleteBoard(parseInt(this.dataset.boardId));
    this.parentElement.parentElement.remove();
}
