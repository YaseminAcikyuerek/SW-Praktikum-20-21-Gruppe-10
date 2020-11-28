class Role:

    def __init__(self):
        self._role_name =""

    def set_role_name(self,value):
        self._role_name =value

    def get_role_name(self):
        return self._role_name

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Project()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_owner(dictionary["owner"])
        return obj
