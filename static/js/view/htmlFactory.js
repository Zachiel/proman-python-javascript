export const htmlTemplates = {
    board: 1,
    status: 2,
    card: 3,
};

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.status]: statusBuilder,
    [htmlTemplates.card]: cardBuilder,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    // return `<div class="board-container">
    //             <div class="board" data-board-id=${board.id}>${board.title}</div>
    //             <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
    //         </div>`;
    return `<div class="accordion-item position-relative board" id="board${board.id}">
                <button class="btn btn-secondary board__add-card-button" data-board-id=${board.id}>+ Add card</button>
                <h2 class="accordion-header" id="heading${board.id}">
                    <div class="accordion-button align-items-baseline" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${board.id}"
                            aria-expanded="true" aria-controls="collapse${board.id}">
                        <h3 class="m-0 me-3 fs-4">${board.title}</h3>
                    </div>
                </h2>
                <div id="collapse${board.id}" class="accordion-collapse collapse show" aria-labelledby="heading${board.id}"
                        data-bs-parent="#accordionBoards">
                    <div class="accordion-body">
                        <div class="row board__body">
                        </div>
                    </div>
                </div>
            </div>`;
}

function statusBuilder(status) {
    return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 board__status-column flex-column" data-status-id="${status.id}">
                <h4 class="board__status-header mb-0 d-flex align-items-center justify-content-center">
                    <input class="board__status-input" value="${status.title}"/>
                </h4>
                <div class="board__card-container container d-flex flex-column">
                </div>
            </div>`;
}

function cardBuilder(card) {
    // return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
    return `<div class="card" data-card-id="${card.id}" data-card-order="${card.order}">
                <div class="card-body">
                    <h5 class="card-title">
                        <input type="text" value="${card.title}" class="board__card-title"/>
                    </h5>
                    <textarea class="card-text board__card-text">${card.body}</textarea>
                </div>
            </div>`;
}
