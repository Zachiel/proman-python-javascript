"Python server file containing routes and responses."
# pylint: disable=unused-import
### TODO: add method description to docstrings
from typing import Any
import uuid
import re
import mimetypes
from flask import Flask, flash, get_flashed_messages, render_template, url_for, request, redirect
from flask import session, abort
from flask.typing import ResponseReturnValue
from dotenv import load_dotenv
from util import json_response
import data_handler.main_handler as data_handler

UPLOAD_FOLDER: str = 'static\\uploads'

mimetypes.add_type('application/javascript', '.js')
app: Flask = Flask(__name__, static_url_path='/static')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 1 * 1000 * 1000
load_dotenv()


@app.route("/",
    methods="GET")
def index() -> str:
    """Root route which displays all boards and cards.

    Methods
    -------
    get

    Returns
    -------
    str
        Renders index.html page
    """

    return render_template('pages/index.html')


@app.route("/register",
    methods="POST")
def registration() -> Any:
    """Route to register a new user to database.

    Methods
    -------
    post
        save new user record into database

    Returns
    -------
    Any : bool
        confirmation on user registration
    """

    fields: list[str] = ["username", "first_name", "last_name", "email"]
    new_user: list[Any] = []
    for item in fields:
        new_user.append(request.form.get(item))
    data_handler.users.register_new_user(new_user)


@app.route("/login",
    methods="POST")
def login() -> ResponseReturnValue:
    """Route for checking credentials validity

    Methods
    -------
    post
        safe payload exchange for input values

    Returns
    -------
    ResponseReturnValue
        : str
            error landing page
        : Response
            redirection to home page
    """

    valid_user: bool = False
    if valid_user:
        return redirect(url_for("index"))
    return abort(401)


@app.route("/logout",
    methods="GET")
def logout() -> ResponseReturnValue:
    """Route for logging out an user and clearing session data.

    Methods
    -------
    get

    Returns
    -------
    ResponseReturnValue
        redirection to home page
    """

    session.clear()
    return redirect(url_for("index"))





@app.route("/api/boards",
    methods=["GET", "POST"])
@json_response
def public_boards() -> ResponseReturnValue | None:
    """Route for retrieving or creating public boards.

    Methods
    -------
    get
        retrieve all public boards
    post
        save a new record into boards database without owner info

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    if request.method == "POST":
        data: Any = request.json
        data_handler.boards.post_public_board(data["title"])
        flash(f"board {data['title']} created succesfuly!", "message")
    else:
        return data_handler.boards.get_all_public_boards()


@app.route("/api/boards/<int:board_id>",
    methods=["GET", "PUT", "PATCH", "DELETE"])
@json_response
def public_board(board_id: int) -> ResponseReturnValue | None:
    """Get specified board from the database.

    Methods
    -------
    get, put, patch, delete

    Parameters
    ----------
    board_id : int
        id of the requested board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.boards.get_public_board(board_id)


@app.route("/api/users/<int:user_id>/boards",
    methods=["GET", "POST"])
@json_response
def user_public_boards(user_id: int) -> ResponseReturnValue | None:
    """Get all boards owned by specified user from the database.

    Methods
    -------
    get, post

    Parameters
    ----------
    user_id : int
        id of the parent user

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.boards.get_all_user_public_boards(user_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>",
    methods=["GET", "PUT", "PATCH", "DELETE"])
@json_response
def user_public_board(user_id: int, board_id: int) -> ResponseReturnValue | None:
    """Get specified board owned by specified user from the database.

    Methods
    -------
    get, put, patch, delete

    Parameters
    ----------
    user_id : int
        id of the parent user
    board_id : int
        id of the requested board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.boards.get_user_public_board(user_id, board_id)


@app.route("/api/boards/<int:board_id>/cards",
    methods=["GET", "POST"])
@json_response
def cards_public_board(board_id: int) -> ResponseReturnValue | None:
    """Get all cards belonging to specified board from the database.

    Methods
    -------
    get, post

    Parameters
    ----------
    board_id : int
        id of parent board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.cards.get_all_cards_public_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/<int:card_id>",
    methods=["GET", "PUT", "PATCH", "DELETE"])
@json_response
def card_public_board(board_id: int, card_id: int) -> ResponseReturnValue | None:
    """Get specified card for a specified board from the database.

    Methods
    -------
    get, put, patch, delete

    Parameters
    ----------
    board_id : int
        id of parent board
    card_id : int
        id of specified card

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.cards.get_card_public_board(board_id, card_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>/cards",
    methods=["GET", "POST"])
@json_response
def cards_user_public_board(
    user_id: int, board_id: int) -> ResponseReturnValue | None:
    """Get all cards belonging to specified user board from the database.

    Methods
    -------
    get, post

    Parameters
    ----------
    user_id : int
        id of parent user
    board_id : int
        id of parent board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.cards.get_all_cards_user_public_board(user_id, board_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>/cards/<int:card_id>",
    methods=["GET", "PUT", "PATCH", "DELETE"])
@json_response
def card_user_public_board(
    user_id: int, board_id: int, card_id: int) -> ResponseReturnValue | None:
    """Get all cards belonging to the specified user board from the database.

    Methods
    -------
    get, put, patch, delete

    Parameters
    ----------
    user_id : int
        id of the parent user
    board_id : int
        id of the parent board
    card_id : int
        id of the requested card

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.cards.get_card_user_public_board(
        user_id, board_id, card_id)


@app.route("/api/users",
    methods=["GET", "POST"])
@json_response
def users() -> ResponseReturnValue | None:
    """Get all users from the database.

    Methods
    -------
    get, post

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.users.get_all_users()


@app.route("/api/users/<int:user_id>",
    methods=["GET", "PUT", "PATCH", "DELETE"])
@json_response
def user(user_id: int) -> ResponseReturnValue | None:
    """Get specified user profile from database.

    Methods
    -------
    get, put, patch, delete

    Parameters
    ----------
    user_id : int
        id of specified user

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    None
        flashed message
    """

    return data_handler.users.get_user(user_id)





def main() -> None:
    """Starts flask server listening on localhost:5000
    """

    app.run(debug=True, host='0.0.0.0', port=5000)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for(
            'static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
