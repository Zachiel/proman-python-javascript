import { dataHandler } from "../data/dataHandler.js";

var init = draggableCards,
    draggableStatuses,
    droppableStatuses,
    droppableBoards;

export let dragManager = {
    initDragElements: function () {
        draggableCards = document.querySelectorAll("fieldset.card-draggable");
        draggableStatuses = document.querySelectorAll(".status-draggable");
        droppableStatuses = document.querySelectorAll(".card-droppable");
        droppableBoards = document.querySelectorAll(".status-droppable");
        draggableCards.forEach((card) => {
            card.addEventListener("dragstart", cardDragStart);
        });
        draggableStatuses.forEach((status) => {
            status.addEventListener("dragstart", statusDragStart);
        });
        droppableStatuses.forEach((status) => {
            status.addEventListener("dragover", cardDragOver);
            const draggable = document.querySelector(".card-dragging");
        });
        droppableBoards.forEach((board) => {
            board.addEventListener("dragover", statusDragOver);
        });
    },
};

function cardDragStart(event) {
    this.classList.add("card-dragging");
}

function cardDragEnd(event) {
    this.classList.remove("card-dragging");
}
function statusDragStart(event) {
    this.classList.add("status-dragging");
}

function statusDragEnd(event) {
    this.classList.remove("status-dragging");
}

function statusDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".status-dragging");
    if (event.target in droppableStatuses) console.log(event);
}

function cardDragOver(event) {
    event.preventDefault();
    const draggable = document.querySelector(".card-dragging");
}
