"""PostgreSQL users queries module.

    Queries regarding users.
"""
from typing import Any
import data_manager


def get_users() -> Any:
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
