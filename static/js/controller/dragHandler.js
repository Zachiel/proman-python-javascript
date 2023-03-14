import { dataHandler } from "../data/dataHandler.js";

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
};

function cardDragStart(event) {
    this.classList.add("card-dragging");
    draggableStatuses.forEach((status) => {
        status.removeEventListener("dragstart", statusDragStart);
    });
    this.addEventListener("dragend", cardDragEnd);
}

function cardDragEnd(event) {
    this.classList.remove("card-dragging");
    draggableStatuses.forEach((status) => {
        status.addEventListener("dragstart", statusDragStart);
    });
}
function statusDragStart(event) {
    this.classList.add("status-dragging");
    this.addEventListener("dragend", statusDragEnd);
}

function statusDragEnd(event) {
    this.classList.remove("status-dragging");
}

function statusDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".status-dragging");
    if (
        draggable &&
        droppableBoards.includes(event.target) &&
        draggable.dataset.boardId == event.target.dataset.boardId
    ) {
        event.target.appendChild(draggable);
        console.log(event);
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
        event.target.appendChild(draggable);
    }
}
