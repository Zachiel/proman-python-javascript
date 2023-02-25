"Python server file containing routes and responses."
# pylint: disable=unused-import
from typing import Any
import uuid
import re
import mimetypes
from flask import Flask, render_template, url_for, request, redirect
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


@app.route("/")
def index() -> str:
    """Root route which displays all boards and cards.

    Returns
    -------
    str
        Renders index.html page
    """

    return render_template('pages/index.html')


@app.route("/register")
def registration() -> Any:
    """Route to register a new user to database.

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


@app.route("/login")
def login() -> ResponseReturnValue:
    """Route for checking credentials validity

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


@app.route("/logout")
def logout() -> ResponseReturnValue:
    """Route for logging out an user and clearing session data.

    Returns
    -------
    ResponseReturnValue
        redirection to home page
    """

    session.clear()
    return redirect(url_for("index"))





@app.route("/api/boards")
@json_response
def get_all_public_boards() -> ResponseReturnValue:
    """Get all boards from the database.

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    """

    return data_handler.boards.get_all_public_boards()


@app.route("/api/boards/<int:board_id>")
@json_response
def get_public_board(board_id: int) -> ResponseReturnValue:
    """Get specified board from the database.

    Parameters
    ----------
    board_id : int
        id of the requested board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    """

    return data_handler.boards.get_public_board(board_id)


@app.route("/api/users/<int:user_id>/boards")
@json_response
def get_all_user_public_boards(user_id: int) -> ResponseReturnValue:
    """Get all boards owned by specified user from the database.

    Parameters
    ----------
    user_id : int
        id of the parent user

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    """

    return data_handler.boards.get_all_user_public_boards(user_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>")
@json_response
def get_user_public_board(user_id: int, board_id: int) -> ResponseReturnValue:
    """Get specified board owned by specified user from the database.

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
    """

    return data_handler.boards.get_user_public_board(user_id, board_id)


@app.route("/api/boards/<int:board_id>/cards")
@json_response
def get_all_cards_public_board(board_id: int) -> ResponseReturnValue:
    """Get all cards belonging to specified board from the database.

    Parameters
    ----------
    board_id : int
        id of parent board

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    """

    return data_handler.cards.get_all_cards_public_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/<int:card_id>")
@json_response
def get_card_public_board(board_id: int, card_id: int) -> ResponseReturnValue:
    """Get specified card for a specified board from the database.

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
    """

    return data_handler.cards.get_card_public_board(board_id, card_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>/cards")
@json_response
def get_all_cards_user_public_board(user_id: int, board_id: int) -> ResponseReturnValue:
    """Get all cards belonging to specified user board from the database.

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
    """

    return data_handler.cards.get_all_cards_user_public_board(user_id, board_id)


@app.route("/api/users/<int:user_id>/boards/<int:board_id>/cards/<int:card_id>")
@json_response
def get_card_user_public_board(user_id: int, board_id: int, card_id: int) -> ResponseReturnValue:
    """Get all cards belonging to the specified user board from the database.

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
    """

    return data_handler.cards.get_card_user_public_board(user_id, board_id, card_id)


@app.route("/api/users")
@json_response
def get_all_users() -> ResponseReturnValue:
    """Get all users from the database.
            
    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
    """

    return data_handler.users.get_all_users()


@app.route("/api/users/<int:user_id>")
@json_response
def get_user(user_id: int) -> ResponseReturnValue:
    """Get specified user profile from database.

    Parameters
    ----------
    user_id : int
        id of specified user

    Returns
    -------
    ResponseReturnValue : dict[str, ...]
        JSON object
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
