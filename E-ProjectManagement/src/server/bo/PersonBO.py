from server.bo import BusinessObject as bo

class Person:

    def __init__(self):
        super().__init__()
        self._status = None

    def set_status(self,role):
        self._status= role

    def get_status(self):
        return self._status

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Personenrolle."""
        return "Person: {}, owned role {}".format(self.get_id(), self._role)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Account()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_owner(dictionary["owner"])
        return obj