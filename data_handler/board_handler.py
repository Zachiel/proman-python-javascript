"""PostgreSQL board queries module.

    Queries regarding boards.
"""
from typing import Any
import data_manager


def get_all_public_boards() -> Any:
    """Gather all public boards.

    Returns
    -------
    Any
        JSON object
    """

    query: str = """
        SELECT *
        FROM boards
        WHERE is_private = FALSE
        """
    public_boards: Any = data_manager.execute_select(query)

    return public_boards

def get_public_board(board_id: int) -> Any:
    """Gather public board with specified id.

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
        FROM boards
        WHERE id = %(id)s
        AND is_private = FALSE
        """
    public_board: Any = data_manager.execute_select(query, {"id": board_id})

    return public_board


def get_all_user_public_boards(user_id: int) -> Any:
    """Gather all public boards for a specified user.

    Parameters
    ----------
    user_id : int

    Returns
    -------
    Any
        JSON object
    """

    query: str = """
        SELECT b.*
        FROM boards AS b
        LEFT JOIN user_boards AS ub ON b.id = ub.board_id
        WHERE is_private = FALSE
        AND ub.user_id = %(id)s
        """
    public_boards: Any = data_manager.execute_select(query, {"id": user_id})

    return public_boards


def get_user_public_board(user_id: int, board_id: int) -> Any:
    """Gather specified public board for a specified user.

    Parameters
    ----------
    user_id : int
    board_id : int

    Returns
    -------
    Any
        JSON object
    """

    query: str = """
        SELECT b.*
        FROM boards AS b
        LEFT JOIN user_boards AS ub ON b.id = ub.board_id
        WHERE b.is_private = FALSE
        AND ub.user_id = %(user_id)s
        AND b.id = %(board_id)s
        """
    public_board: Any = data_manager.execute_select(query, {"user_id": user_id,
                                                            "board_id": board_id})

    return public_board
