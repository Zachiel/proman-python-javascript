import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {showMessage} from "./messages.js";

export let cardsManager = {
    loadCards: async function (boardId, statusId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            if (card.status_id == statusId && card.board_id == boardId) {
                if (card.body == null) {
                    card.body = "";
                }
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card);
                domManager.addChild(`.board__card-container[data-board-id="${boardId}"][data-status-id="${statusId}"]`, content);
                // domManager.addEventListener(
                //     `.card[data-card-id="${card.id}"]`,
                //     "click",
                //     deleteButtonHandler
                // );
                domManager.addEventListener(
                    `input[data-card-id="${card.id}"]`,
                    "change",
                    updateHandler
                );
                domManager.addEventListener(
                    `button[data-card-id="${card.id}"]`,
                    "click",
                    deleteHandler
                );
            }
        }
    }, addCardEvent: (e) => {
        const button = e.currentTarget;
        button.toggleAttribute('disabled');
        const board = button.parentNode;
        const boardId = board.querySelector('.board__title-input').dataset.boardId;
        const firstStatus = board.querySelector('.board__card-container');
        if (firstStatus) {
            const firstStatusId = firstStatus.dataset.statusId;
            const card = {
                'title': 'New card',
                'status_id': firstStatusId,
                'body': "",
                'order': getLastCardOrder + 1,
                'board_id': boardId
            };

            const cardHMTLContent = htmlFactory(htmlTemplates.card)(card);
            firstStatus.insertAdjacentHTML('beforeend', cardHMTLContent);
            const cardDOMNode = firstStatus.querySelector('.card:last-child');
            cardDOMNode.toggleAttribute('disabled');
            setTimeout(() => {
                cardDOMNode.toggleAttribute('disabled');
                button.toggleAttribute('disabled')
            }, 1000);
        } else {
            showMessage('There must be at least one status to add a card');
            button.toggleAttribute('disabled');
        }
    },
};

const getLastCardOrder = () => {
    return -1;
}

const checkIfElementIsCard = (element) => {
    let result = false;
    const cardElemsClasses = ["card", "card-body", "card-title", "board__card-title", "board__card-text",];
    cardElemsClasses.forEach((className) => {
        if (element.classList.contains(className)) {
            result = true;
        }
    });
    return result;
};

const getWholeCardElement = (element) => {
    if (element) {
        if (element.classList.contains("card")) {
            return element;
        }
        if (element.tagName === "body") {
            return false;
        }
        return getWholeCardElement(element.parentElement);
    } else {
        return false;
    }
};

function deleteButtonHandler(clickEvent) {
}

function updateHandler() {
    let boardId = parseInt(this.dataset.boardId);
    let cardId = parseInt(this.dataset.cardId);
    dataHandler.updateCard(boardId, cardId, {
        title: this.value, body: this.parentElement.nextElementSibling.value,
    });
}

export const cardsModal = () => {
    const cardsModalEvent = (e) => {
        const targetElement = e.target;
        if (checkIfElementIsCard(targetElement)) {
            const card = getWholeCardElement(targetElement);
            if (card)
                if (!card.hasAttribute('disabled')) {
                    const cardTitle = card.querySelector(".board__card-title").value;
                    const cardText = card.querySelector(".board__card-text").value;
                    const modalElement = document.querySelector("#card-modal");
                    document.querySelector("#card-modal__input").value = cardTitle;
                    document.querySelector("#card-modal__textarea").value = cardText;
                    const myModal = new bootstrap.Modal(modalElement).show();
                } else { }
            else {
                console.log("Couldn't get the card for DOM element: ", targetElement);
            }
        }
    };
    const boardsAccordion = document.querySelector("#boardsAccordion");
    boardsAccordion.addEventListener("dblclick", cardsModalEvent);
};

async function deleteHandler() {
    await dataHandler.deleteCard(
        parseInt(this.dataset.boardId),
        parseInt(this.dataset.cardId)
    );
    this.parentElement.parentElement.parentElement.remove();
}
