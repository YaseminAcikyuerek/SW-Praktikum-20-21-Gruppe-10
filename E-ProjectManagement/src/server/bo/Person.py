from server.bo.Role import Role as rbo
from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Person(rbo, nbo):

    def __init__(self):
        super().__init__()
        self._role_id = ""

    def set_role_id(self, role_id):
        self._role_id = role_id

    def get_role_id(self):
        return self._role_id

    def __str__(self):
        return "Person: {}, {}, {}".format(self.get_id(), self._name, self._role_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_role_id(dictionary["role_id"])
        return obj
