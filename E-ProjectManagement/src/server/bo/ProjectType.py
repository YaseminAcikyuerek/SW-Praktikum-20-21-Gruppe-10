from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class ProjectType(nbo):
    def __init__(self):
        super().__init__()

        self._sws = ""
        self._ects = ""
    def set_sws(self, value):
        self._sws = value

    def get_sws(self):
        return self._sws

    def set_ects(self, value):
        self._ects = value

    def get_ects(self):
        return self._ects


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein ProjectTyp()."""
        obj = ProjectType()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_name(dictionary["name"])
        obj.set_sws(dictionary["sws"])
        obj.set_ects(dictionary["ects"])
        return obj