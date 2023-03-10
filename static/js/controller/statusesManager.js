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
        const addStatusInput = htmlFactory(htmlTemplates.addStatus)(boardId);
        domManager.addChild(`.board__body[data-board-id="${boardId}"]`, addStatusInput)
        document.querySelector(`.board__status-input--new[data-board-id="${boardId}"]`).addEventListener('blur', handleAddStatusBlur);
    },
    postStatus: async function (payload) {
        await dataHandler.createNewStatus(payload);
    },
};

const handleAddStatusBlur = e =>{
    const newStatus = e.currentTarget.value;
    if(newStatus !== ""){
        console.log('That should add a new status: ', newStatus);
        e.currentTarget.value = "";
    }
};

function showHideButtonHandler(clickEvent) {
    const statusId = clickEvent.target.dataset.statusId;
    cardsManager.loadCards(boardId, statusId);
}

function updateHandler() {
    let statusId = parseInt(this.dataset.statusId);
    let boardId = parseInt(this.dataset.boardId);
    if (statusId <= 4) {
        statusesManager.postStatus({
            title: this.value,
            boardId: boardId,
            statusId: statusId,
        });
    } else {
        dataHandler.updateStatus({
            title: this.value,
            boardId: boardId,
            statusId: statusId,
        });
    }
}
