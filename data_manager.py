"Database utility functions."
# pylint: disable=no-name-in-module, unused-import
# pyright: reportOptionalContextManager=false, reportOptionalSubscript=false
import os
from typing import Callable, Any
from psycopg2._psycopg import connection
from psycopg2.extras import RealDictCursor, RealDictRow
import psycopg2


def establish_connection(connection_data: dict[str, Any] | None=None) \
    -> connection | None:
    """
    Create a database connection based on the :connection_data: parameter
    :connection_data: Connection string attributes
    :returns: psycopg2.connection
    """
    if connection_data is None:
        connection_data = get_connection_data()
    try:
        connect_str: str = f"dbname={connection_data['dbname']}\
            user={connection_data['user']} host={connection_data['host']}\
            password={connection_data['password']}"
        conn: connection = psycopg2.connect(connect_str)
        conn.autocommit = True
    except psycopg2.DatabaseError as error:
        print("Cannot connect to database.")
        print(error)
    else:
        return conn


def get_connection_data(db_name: str | None=None) -> dict[str, Any] | None:
    """
    Give back a properly formatted dictionary based on the
    environment variables values which are started with :MY__PSQL_: prefix
    :db_name: optional parameter. By default it uses the 
    environment variable value.
    """
    if db_name is None:
        db_name = os.environ.get('MY_PSQL_DBNAME')

    return {
        'dbname': db_name,
        'user': os.environ.get('MY_PSQL_USER'),
        'host': os.environ.get('MY_PSQL_HOST'),
        'password': os.environ.get('MY_PSQL_PASSWORD')
    }


def execute_select(statement, variables=None, fetchall=True)\
    -> list[RealDictRow] | RealDictRow | None:
    """
    Execute SELECT statement optionally parameterized.
    Use fetchall=False to get back one value (fetchone)

    Example:
    > execute_select('SELECT %(title)s; FROM shows',
                                                variables={'title': 'Codecool'})
    statement: SELECT statement
    variables:  optional parameter dict, optional parameter fetchall"""
    result_set = []
    with establish_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(statement, variables)
            result_set: list[RealDictRow] | RealDictRow | None\
                = cursor.fetchall() if fetchall else cursor.fetchone()
    return result_set
