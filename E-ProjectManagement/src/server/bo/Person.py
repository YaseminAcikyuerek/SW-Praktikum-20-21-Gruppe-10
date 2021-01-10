from server.bo.NamedBusinessObject import NamedBusinessObject as nbo


class Person(nbo):

    def __init__(self):
        super().__init__()
        self._role = None
        self._rechte_student=None
        self._rechte_admin=None
        self._rechte_dozent=None



    def set_role(self, role):
        self._role = role

    def get_role(self):
        return self._role


    def set_rechte_student(self, rechte_student):
        self._rechte_student = rechte_student

    def get_rechte_student(self):
        return self._rechte_student


    def set_rechte_admin(self, rechte_admin):
        self._rechte_admin = rechte_admin

    def get_rechte_admin(self):
        return self._rechte_admin


    def set_rechte_dozent(self, rechte_dozent):
        self._rechte_dozent = rechte_dozent

    def get_rechte_dozent(self):
        return self._rechte_dozent










    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Role()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_role(dictionary["role"])
        obj.set_rechte_student(dictionary["rechte_student"])
        obj.set_rechte_admin(dictionary["rechte_admin"])
        obj.set_rechte_dozent(dictionary["rechte_dozennt"])

        return obj
