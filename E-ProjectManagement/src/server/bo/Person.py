from server.bo import BusinessObject as bo
from server.bo import Role as rbo
from server.bo import NamedBusinessObject as nbo


class Person(bo, rbo, nbo):

    def __init__(self):
        super().__init__()
        self._role_id = None

    def set_role_id(self, role):
        self._role_id = role

    def get_role_id(self):
        return self._role_id

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_role(dictionary["role"])
        return obj
