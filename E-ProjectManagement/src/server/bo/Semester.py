from server.bo.NamedBusinessObject import NamedBusinessObject as nbo
import datetime

class Semester(nbo):

    def __init__(self):
        super().__init__()
        self._start = None
        self._end = None

    def set_start(self, value):
        self._start = value

    def get_start(self):
        return self._start

    def set_end(self, value):
        self._end = value

    def get_end(self):
        return self._end


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Semester()."""
        obj = Semester()
        print(dictionary)
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_name(dictionary["name"])
        obj.set_start(dictionary["start"])
        obj.set_end(dictionary["end"])
        return obj