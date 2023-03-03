"Middleware utility module for file and response management."

from functools import wraps
from typing import Callable
from flask import Response, jsonify
from re import search as regex_search


def json_response(func: Callable) -> Callable[..., Response]:
    "Converts the returned dictionary into a JSON response."
    @wraps(func)
    def decorated_function(*args, **kwargs) -> Response:
        return jsonify(func(*args, **kwargs))

    return decorated_function


def regex_validate(regex: str, string: str) -> bool:
    """Check if provided string matches provided regex

    Parameters
    ----------
    regex : str
        Regular expression to match the string with

    string : str
        String to be matched with regular expression

    Returns
    -------
    bool
        True if the string match regex formula, False otherwise
    """
    return not (regex_search(regex, string) is None)
