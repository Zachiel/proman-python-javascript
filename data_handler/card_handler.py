"""PostgreSQL card queries module.

    Queries regarding
"""
from typing import Any
import data_manager

def get_cards_for_board(board_id: int) -> Any:
    """Gather all cards for a specified board.

    Parameters
    ----------
    board_id : int

    Returns
    -------
    Any
        JSON object
    """
    query: str = """
        SELECT *
        FROM cards
        WHERE cards.board_id = %(id)s
        """
    matching_cards: Any = data_manager.execute_select(query,
        {"id": board_id})

    return matching_cards
