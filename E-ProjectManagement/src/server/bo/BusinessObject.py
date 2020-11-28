from abc import ABC, abstractmethod

class BusinessObject(ABC):
    """Oberklasse aller BusinessObject-Klassen in diesem Projekt .

    Jedes Objekt bestizt eine eindeutigte ID, welches als Primärschlüssel bei der relationen
    Datenbank dient
    """

    def __init__(self):
        self._id = 0  # Die eindeutige ID

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self, value):
        """Setzen der ID."""
        self._id = value

    def set_contribution_date(self, date):
        self._contribution_date = date

    def get_contribution_date(self):
        return self._contribution_date