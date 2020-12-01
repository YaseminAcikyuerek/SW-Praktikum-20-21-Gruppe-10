from server.bo import BusinessObject as bo

class Person:

    def __init__(self):
        super().__init__()
        self._role = None

    def set_status(self,role):
        self._role= role

    def get_status(self):
        return self._role



    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_role(dictionary["role"])
        return obj