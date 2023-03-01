"""PostgreSQL status queries module.

    Queries regarding statuses.
"""
from typing import Any
from functools import reduce
import data_manager


def get_status(status_id: int) -> Any:


    query: str = """
    SELECT title
    FROM statuses
    WHERE id = %(id)s
    """
    matching_status: Any = data_manager.execute_select(query, {"id": status_id})

    return matching_status


def get_board_statuses(board_id: int) -> Any:


    query: str = """
    SELECT s.title, bs.order
    FROM board_statuses AS bs
    LEFT JOIN statuses AS s ON s.id = bs.status_id
    WHERE bs.board_id = %(id)s
    """
    matching_statuses: Any = data_manager.execute_select(query, {"id": board_id})

    return matching_statuses


def post_status(board_id: int, title: str) -> Any:


    query_statuses: str = """
    INSERT INTO statuses (title)
    VALUES(
        %(title)s
    )
    RETURNING id
    """
    query_board_statuses: str = """
    INSERT INTO board_statuses (status_id, board_id, order)
    VALUES (
        %(status_id)s, %(board_id)s, 
        (SELECT
            (MAX(order) + 1)
            FROM board_statuses
            WHERE board_id = %(board_id)s)
    )
    """
    status_id: Any = data_manager.execute_insert(query_statuses, {"title": title}, True)
    data_manager.execute_insert(query_board_statuses,
        {"status_id": status_id, "board_id": board_id})


def patch_status(status_id: int, data: dict[str, Any]) -> None:


    data_insert_str: str = "SET %s = %s" + ", %s = %s" * (len(data)-1)
    query: str = "UPDATE statuses" + data_insert_str + "WHERE id = %s"
    data_list: list[str | int] = list(reduce(lambda k, v: k + v, data.items()))
    data_list.append(status_id)
    data_manager.execute_other(query, data_list)
