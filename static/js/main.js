import { boardsManager } from "./controller/boardsManager.js";
import { cardsModal } from "./controller/cardsManager.js";
import { usersHandler } from "./controller/usersManager.js";
import { cardsManager } from "./controller/cardsManager.js";
import { styling } from "./view/style.js";
import { domManager } from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    cardsModal();
    document
        .querySelector("#registration-form")
        .addEventListener("submit", usersHandler.registerEvent);
    document
        .querySelector("#login-form")
        .addEventListener("submit", usersHandler.loginEvent);
    const accountButton = document.querySelector(".header__button--account");
    if (accountButton) {
        accountButton.addEventListener("click", usersHandler.checkAccountEvent);
    }
    const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    styling.adjustContentPadding();
    styling.adjustBackgroundImageSize();
}

window.onload = () => {
    init();
    window.onresize = () => {
        styling.adjustContentPadding();
        styling.adjustBackgroundImageSize();
    };
    window.onmousemove = (e) => {
        const mouseDeltaY = e.clientY - window.innerHeight / 2;
        const mouseDeltaX = e.clientX - window.innerWidth / 2;
        const maxDeltaY = window.innerHeight / 2;
        const maxDeltaX = window.innerWidth / 2;
        const percentageY = mouseDeltaY / maxDeltaY;
        const percentageX = mouseDeltaX / maxDeltaX;

        styling.parallaxBackground(percentageX, percentageY);
    };
};
