from server.bo.BusinessObject import BusinessObject as bo


class Participation(bo):

    def __init__(self):
        super().__init__()
        self._project = ""
        self._student = ""

    def set_project(self, project):
        self._project = project

    def get_project(self):
        return self._project

    def set_student(self, student):
        self._student = student

    def get_student(self):
        return self._student

    #def __str__(self):
        #return "Participation: {}, {},".format(self.get_id(), self.get_project())

    """def to_dict(self):
        Umwandeln User() in ein Python dict()
        result = {
            "id": self.get_id(),
            "project": self.get_project(),
            "student": self.get_student(),
        }
        return result"""

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Participation()."""
        obj = Participation()
        print(dictionary)
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_project(dictionary["project"])
        obj.set_student(dictionary["student"])

        return obj