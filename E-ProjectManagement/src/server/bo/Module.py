from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Module(nbo):
    def __init__(self):
        super().__init__()
        self._edv_nr = ""

    def set_edv_nr(self, value):
        self._edv_nr = value

    def get_edv_nr(self):
        return self._edv_nr


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Module()."""
        obj = Module()
        print(dictionary)
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_name(dictionary["name"])
        obj.set_edv_nr(dictionary["edv_nr"])
        return obj