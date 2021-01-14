
class Role():

    def __init__(self):
        self._name = ""
        self._id = ""

    def set_id(self, value):
        self._id = value

    def get_id(self):
        return self._id

    def set_name(self, value):
        self._name = value

    def get_name(self):
        return self._name

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Role()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        return obj


