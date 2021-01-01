from server.bo.BusinessObject import BusinessObject as bo


class Participation(bo):

    def __init__(self):
        super().__init__()
        self._project = None
        self._student = None

    def set_project(self, project):
        self._project = project

    def get_project(self):
        return self._project

    def set_student(self, student):
        self._student = student

    def get_student(self):
        return self._student

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Participation()."""
        obj = Participation()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_project(dictionary["project"])
        obj.set_student(dictionary["student"])
        return obj