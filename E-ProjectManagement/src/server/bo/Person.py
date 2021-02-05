from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Person(nbo):

    def __init__(self):
        super().__init__()
        self._role = None
        self._google_mail = ""
        self._google_user_id = ""

    def set_role(self, role):
        self._role = role

    def get_role(self):
        return self._role

    def set_google_mail(self, google_mail):
        self._google_mail = google_mail

    def get_google_mail(self):
        return self._google_mail

    def set_google_user_id(self, google_user_id):
        self._google_user_id = google_user_id

    def get_google_user_id(self):
        return self._google_user_id

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        print(dictionary)
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_name(dictionary["name"])
        obj.set_role(dictionary["role"])
        obj.set_google_mail(dictionary["google_mail"])
        obj.set_google_user_id(dictionary["google_user_id"])
        return obj
