"""PostgreSQL queries module.

    Main handler with specific type connection imports.

    Example
    -------
    Use this module as a reference to others:
        >>> import data_handler.main_handler as data_handler
    And then reference specific types:
        >>> data_handler.cards.<function_name>
"""
# pylint: disable=unused-import
from typing import Any
import bcrypt
import data_handler.card_handler as cards
import data_handler.board_handler as boards
import data_handler.user_handler as users
import data_handler.status_handler as status
import data_manager
