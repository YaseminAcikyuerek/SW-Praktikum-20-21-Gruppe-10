from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Semester(nbo):

    def __init__(self):
        self._start =""
        self._end =""

    def set_start(self,value):
        self._start = value

    def get_start(self):
        return self._start

    def set_end(self,value):
        self._end = value

    def get_end(self):
        return self._end


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Semester()."""
        obj = Semester()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_start(dictionary["semester_start"])
        obj.set_end(["semester_end"])
        return obj