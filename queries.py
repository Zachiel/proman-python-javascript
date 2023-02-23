"PostgreSQL queries module."
# pylint: disable=unused-import
from typing import Any
import bcrypt
import data_manager


def get_card_status(status_id: int) -> Any | None:
    "Find the first status matching the given id. Returns a JSON object."
    query: str = """
        SELECT * FROM statuses
        WHERE statuses.id = %(id)s
        ;
        """
    status: Any | None = data_manager.execute_select(query,
        {"id": status_id})

    return status


def get_boards() -> Any:
    "Gather all boards. Returns a JSON object."
    query: str = """
    SELECT * FROM boards
    """
    boards: Any = data_manager.execute_select(query)

    return boards


def get_cards_for_board(board_id) -> Any:
    "Gather all cards for specified board. Returns a JSON object."
    query: str = """
        SELECT * FROM cards
        WHERE cards.board_id = %(id)s
        ;
        """
    matching_cards: Any = data_manager.execute_select(query,
        {"id": board_id})

    return matching_cards
