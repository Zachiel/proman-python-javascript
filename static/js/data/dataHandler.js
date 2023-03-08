export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    updateBoard: async function (payload) {
        return await apiPatch(`/api/boards/${payload.id}`, payload);
    },
    getStatusesByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/statuses`);
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    createNewStatus: async function (payload) {
        return await apiPost(
            `api/boards/${payload.id}/statuses`,
            payload.title
        );
    },
    updateStatus: async function (payload) {
        return await apiPatch(
            `api/boards/${payload.boardId}/statuses/${payload.id}`,
            payload.title
        );
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    registerUser: async function (userJSON) {
        return await apiPost("/register", userJSON);
    },
    loginUser: async function (loginJSON) {
        return await apiPost("/login", loginJSON);
    },
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url) {}

// async function apiPut(url) {}

async function apiPatch(url, payload) {
    let response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        return await response.json();
    }
}
