import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

export const cardsModal = () =>{
    const cardsModalEvent = e => {
        const cardTitle = e.currentTarget.querySelector('.board__card-title').value;
        const cardText = e.currentTarget.querySelector('.board__card-text').textContent;
        const modalElement = document.querySelector('#card-modal');
        modalElement.querySelector('.board__card-title').value=cardTitle;
        modalElement.querySelector('.board__card-text').textContent=cardText;
        const myModal = new bootstrap.Modal(modalElement).show();
    };
    const cards = document.querySelectorAll('.card');
    cards.forEach(card=>{
        card.addEventListener('dblclick', cardsModalEvent);
    });
};

function deleteButtonHandler(clickEvent) {
}
