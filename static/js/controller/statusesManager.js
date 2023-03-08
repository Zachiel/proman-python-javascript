import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";

export let statusesManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatusesByBoardId(boardId);
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.status);
            const content = statusBuilder(status, boardId);
            domManager.addChild(
                `.board__body[data-board-id="${boardId}"]`,
                content
            );
            domManager.addEventListener(
                `input[data-status-id="${status.id}"]`,
                "change",
                updateHandler
            );
            cardsManager.loadCards(boardId, status.id);
        }
    },
    postStatus: async function (payload) {
        await dataHandler.createNewStatus(payload);
    },
};

function showHideButtonHandler(clickEvent) {
    const statusId = clickEvent.target.dataset.statusId;
    cardsManager.loadCards(boardId, statusId);
}

function updateHandler() {
    let statusId = parseInt(this.dataset.boardId);
    if (statusId <= 4) {
        statusesManager.postStatus({
            title: this.value,
            boardId: parseInt(this.dataset.boardId),
            statusId: statusId,
        });
    } else {
        dataHandler.updateStatus({
            title: this.value,
            boardId: parseInt(this.dataset.boardId),
            statusId: statusId,
        });
    }
}
