from abc import ABC
from datetime import datetime


class BusinessObject(ABC):

    """Oberklasse aller BusinessObject-Klassen in diesem Projekt .

    Jedes Objekt bestizt eine eindeutigte ID, welches als Primärschlüssel bei der relationen
    Datenbank dient
    """

    def __init__(self):
        self._id = 0
        self._creation_time = datetime.now()

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self, value):
        """Setzen der ID."""
        self._id = value

    def get_creation_time(self):
        return self._creation_time

    def set_creation_time(self, creation_time):
        self._creation_time = creation_time
