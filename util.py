"Utility module for file and response management."

from functools import wraps
from typing import Callable
from flask import Response, jsonify


def json_response(func: Callable) -> Callable[..., Response]:
    "Converts the returned dictionary into a JSON response."
    @wraps(func)
    def decorated_function(*args, **kwargs) -> Response:
        return jsonify(func(*args, **kwargs))

    return decorated_function
