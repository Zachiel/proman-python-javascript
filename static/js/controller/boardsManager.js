import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { statusesManager } from "./statusesManager.js";

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
                `input[data-board-id="${board.id}"]`,
                "change",
                updateHandler
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
        statusesManager.loadStatuses(boardId);
    }
}

async function updateHandler() {
    dataHandler.updateBoard({
        title: this.value,
        is_private: this.dataset.boardPrivate,
        id: parseInt(this.dataset.boardId),
    });
}
