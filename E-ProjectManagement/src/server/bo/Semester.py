from server.bo import BusinessObject as bo
from server.bo import NamedBusinessObject as nbo

class Semester:
    def __init__(self):
        self._semester_start =""
        self._semester_end =""

    def set_semester_start(self,value):
        self._semester_start = value

    def get_semester_end(self):
        return self._semester_end


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Semester()."""
        obj = Semester()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_semester_start(dictionary["semester_start"])
        obj.set_semester_end(["semester_end"])
        return obj