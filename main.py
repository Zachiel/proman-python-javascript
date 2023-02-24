"Python server file containing routes and responses."
### remove this line for implementation
# pylint: disable=fixme
###
# pylint: disable=unused-import
from typing import Any
import uuid
import re
import mimetypes
from flask import Flask, render_template, url_for, request, redirect, Response
from flask import session, abort
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
    Renders index.html page
    """
    return render_template('pages/index.html')


@app.route("/api/boards")
@app.route("/api/users/<int:user_id>/boards")
@json_response
def get_boards(user_id: int=0) -> Any:
    """Get all boards from the database.

    Parameters
    ----------
    user_id : int, optional
        id of the user which boards to show, by default 0

    Returns
    -------
    Any
        JSON object
    """
    return data_handler.boards.get_public_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@app.route("/api/users/<int:user_id>/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int, user_id: int=0) -> Any:
    """Get all cards belonging to the specified board.

    Parameters
    ----------
    board_id : int
        id of the parent board
    user_id : int, optional
        id of the parent user, by default 0

    Returns
    -------
    Any
        JSON object
    """
    # TODO: Set up proper variables and checks
    user: Any = session.get("user")
    if not user and not user_id:
        abort(401)
    return data_handler.cards.get_cards_for_board(board_id)


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
