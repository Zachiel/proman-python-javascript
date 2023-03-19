import {dataHandler} from "../data/dataHandler.js";

let draggableCards, draggableStatuses, droppableStatuses, droppableBoards;

export let dragManager = {
    initDragElements: function () {
        draggableCards = [
            ...document.querySelectorAll("fieldset.card-draggable"),
        ];
        draggableStatuses = [...document.querySelectorAll(".status-draggable")];
        droppableStatuses = [...document.querySelectorAll(".card-droppable")];
        droppableBoards = [...document.querySelectorAll(".status-droppable")];
        draggableCards.forEach((card) => {
            card.addEventListener("dragstart", cardDragStart);
        });
        draggableStatuses.forEach((status) => {
            status.addEventListener("dragstart", statusDragStart);
        });
        droppableStatuses.forEach((status) => {
            status.addEventListener("dragover", cardDragOver);
        });
        droppableBoards.forEach((board) => {
            board.addEventListener("dragover", statusDragOver);
        });
    },
    handleNewElement: function (elem, type) {
        const TYPES = {board: 0, status: 1, card: 2};
        const FUNCTIONS = [{'dragover': statusDragOver}, {
            'dragstart': statusDragStart,
            'dragover': cardDragOver
        }, {'dragstart': cardDragStart}];
        const functionsToAdd = FUNCTIONS[TYPES[type]];
        for (let key in functionsToAdd) {
            elem.addEventListener(key, functionsToAdd[key]);
        }
    }
};


function cardDragStart(event) {
    this.classList.add("card-dragging");
    draggableStatuses.forEach((status) => {
        status.removeEventListener("dragstart", statusDragStart);
    });
    droppableBoards.forEach((board) => {
        board.removeEventListener("dragover", statusDragOver);
    });
    this.addEventListener("dragend", cardDragEnd);
}

function cardDragEnd(event) {
    this.classList.remove("card-dragging");
    draggableStatuses.forEach((status) => {
        status.addEventListener("dragstart", statusDragStart);
    });
    droppableBoards.forEach((board) => {
        board.addEventListener("dragover", statusDragOver);
    });
    this.dataset.statusId = this.parentElement.dataset.statusId;
    fixOrder(this);
}

function statusDragStart(event) {
    this.classList.add("status-dragging");
    this.addEventListener("dragend", statusDragEnd);
}

function statusDragEnd(event) {
    this.classList.remove("status-dragging");
    fixOrder(this);
}

function statusDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".status-dragging");
    const newColumn = document.querySelector(
        `.status-droppable[data-board-id="${draggable.dataset.boardId}"] .board__status-column:not(.status-draggable)`
    );

    if (
        draggable &&
        droppableBoards.includes(event.target) &&
        draggable.dataset.boardId == event.target.dataset.boardId
    ) {
        const previousSibling = getDragPreviousStatusSibling(
            event.target,
            event.clientX
        );
        if (previousSibling == null || previousSibling == undefined) {
            event.target.appendChild(draggable);
        } else {
            event.target.insertBefore(draggable, previousSibling);
        }
        event.target.appendChild(newColumn);
    }
}

function cardDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".card-dragging");

    if (
        draggable &&
        droppableStatuses.includes(event.target) &&
        draggable.dataset.boardId == event.target.dataset.boardId
    ) {
        const previousSibling = getDragPreviousCardSibling(
            event.target,
            event.clientY
        );
        if (previousSibling == null || previousSibling == undefined) {
            event.target.appendChild(draggable);
        } else {
            event.target.insertBefore(draggable, previousSibling);
        }
    }
}

function getDragPreviousCardSibling(container, y) {
    const draggableElements = [
        ...container.querySelectorAll(".card-draggable:not(.card-dragging)"),
    ];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child};
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
}

function getDragPreviousStatusSibling(container, x) {
    const draggableElements = [
        ...container.querySelectorAll(
            ".status-draggable:not(.status-dragging)"
        ),
    ];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = x - box.left - box.width / 2;
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child};
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
}

function fixOrder(element) {
    const allSiblings = [...element.parentElement.children];
    let i = 1;
    allSiblings.forEach((element) => {
        if ("statusOrder" in element.dataset) {
            if (parseInt(element.dataset.statusOrder) != i) {
                let boardId = element.dataset.boardId;
                let statusId = element.dataset.statusId;
                element.dataset.statusOrder = i;
                dataHandler.updateStatus(boardId, statusId, {
                    status_order: i,
                });
            }
        } else if ("cardOrder" in element.dataset) {
            if (parseInt(element.dataset.cardOrder) != i) {
                let boardId = element.dataset.boardId;
                let statusId = element.dataset.statusId;
                let cardId = element.dataset.cardId;
                element.dataset.cardOrder = i;
                dataHandler.updateCard(boardId, cardId, {
                    status_id: statusId,
                    card_order: i,
                });
            }
        }
        i += 1;
    });
}
