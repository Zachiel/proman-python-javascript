"""PostgreSQL users queries module.

    Queries regarding users.
"""
from typing import Any
import data_manager


def register_new_user(*args) -> None:
    pass


def get_all_users() -> Any:
    """Gather all users list.

    Returns
    -------
    Any
        JSON object
    """
    query: str = """
        SELECT id, username, first_name AS name, last_name AS surname,
            registration_date AS registered
        FROM users
        """
    users: Any = data_manager.execute_select(query)

    return users


def get_user(user_id: int) -> Any:
    """Gather specified user profile.

    Parameters
    ----------
    user_id : int
        id of specified users
    
    Returns
    -------
    Any
        JSON object
    """
    query: str = """
        SELECT id, username, first_name AS name, last_name AS surname,
            registration_date AS registered
        FROM users
        WHERE id = %(id)s
        """
    user: Any = data_manager.execute_select(query, {"id": user_id})

    return user


def get_user_by_username(username: str) -> Any:


    query: str = """
    SELECT id, username
    FROM users
    WHERE username = %(username)s
    """
    user: Any = data_manager.execute_select(query, {"username": username})

    return user


def check_permission(user: str, board_id: int=0) -> bool:


    if user and board_id > 0:
        return True
    return False
