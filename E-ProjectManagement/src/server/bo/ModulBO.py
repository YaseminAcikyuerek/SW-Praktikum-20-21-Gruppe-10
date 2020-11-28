from server.bo import BusinessObject as bo

class Module:
    def __init__(self):
        self._edv_nr = ""

    def set_edv_nr(self,value):
        self._edv_nr= value

    def get_edv_nr(self):
        return self._edv_nr


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Account()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_owner(dictionary["owner"])
        return obj