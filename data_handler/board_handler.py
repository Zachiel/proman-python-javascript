"""PostgreSQL board queries module.

    Queries regarding boards.
"""
from typing import Any
import data_manager

def get_public_boards() -> Any:
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


def get_user_private_boards(user_id: int) -> Any:
    """Gather all private boards for a specified user.

    Parameters
    ----------
    user_id : int

    Returns
    -------
    Any
        JSON object
    """
    query: str = """
    SELECT *
    FROM boards AS b
    LEFT JOIN user_boards AS ub ON b.id = ub.board_id
    WHERE is_private = TRUE
    AND ub.user_id = %(id)s
    """
    private_boards: Any = data_manager.execute_select(query, {"id": user_id})

    return private_boards
