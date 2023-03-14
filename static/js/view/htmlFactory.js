export const htmlTemplates = {
    board: 1,
    status: 2,
    card: 3,
    addStatus: 4,
};

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.status]: statusBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.addStatus]: addStatusBuilder,
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

function addStatusBuilder(boardId) {
    return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 board__status-column flex-column">
                <h4 class="board__status-header mb-0 d-flex align-items-center justify-content-center">
                    <input
                        class="board__status-input board__status-input--new"
                        placeholder="New Column"
                        data-board-id='${boardId}'
                    />
                </h4>
            </div>`;
}

function boardBuilder(board) {
    return `<div class="accordion-item position-relative board status-droppable">
                <button class="btn btn-secondary board__add-card-button" data-board-id="${board.id}">+ Add card</button>
                <button class="btn btn-danger button-delete" data-board-id="${board.id}"><i class="fa-solid fa-x"></i></button>
                <h2 class="accordion-header" id="heading${board.id}">
                    <div class="accordion-button align-items-baseline collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${board.id}" aria-expanded="false" aria-controls="collapse${board.id}" data-board-id="${board.id}">
                        <input class="board__title-input m-0 me-3 fs-4" data-board-id="${board.id}" data-board-private="${board.is_private}" value="${board.title}">
                    </div>
                </h2>
                <div id="collapse${board.id}" class="accordion-collapse collapse" aria-labelledby="heading${board.id}"
                        data-bs-parent="#accordionBoards">
                    <div class="accordion-body">
                        <div class="row board__body" data-board-id="${board.id}">
                        </div>
                    </div>
                </div>
            </div>`;
}

function statusBuilder(status) {
    return `<div class="col-12 col-sm-6 col-md-4 col-lg-3 board__status-column flex-column card-droppable status-draggable" data-status-id="${status.id}" data-status-order="${status.status_order}" data-board-id="${status.board_id}" draggable="true">
                <h4 class="board__status-header mb-0 d-flex align-items-center justify-content-center">
                    <input class="board__status-input" value="${status.title}" data-status-id="${status.id}" data-board-id="${status.board_id}"/>
                    <button class="btn btn-danger button-delete" data-board-id="${status.board_id}" data-status-id="${status.id}"><i class="fa-solid fa-x"></i></button>
                </h4>
                <div class="board__card-container container d-flex flex-column" data-board-id="${status.board_id}" data-status-id="${status.id}">
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<fieldset class="card card-draggable" data-card-id="${card.id}" data-card-order="${card.card_order}" data-card-archived="${card.archived}" draggable="true">
                <div class="card-body">
                    <h5 class="card-title">
                        <input type="text" class="board__card-title" value="${card.title}" data-card-id="${card.id}" data-board-id="${card.board_id}" data-status-id="${card.status_id}" data-card-order="${card.order}" data-card-archived="${card.archived}"/>
                        <button class="btn btn-danger button-delete" data-board-id="${card.board_id}" data-card-id="${card.id}"><i class="fa-solid fa-x"></i></button>
                    </h5>
                    <textarea class="card-text board__card-text">${card.body}</textarea>
                </div>
            </fieldset>`;
}
