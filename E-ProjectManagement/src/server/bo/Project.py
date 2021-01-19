from server.bo.NamedBusinessObject import NamedBusinessObject as nbo
from server.bo.Automaton import Automaton


class Project(nbo, Automaton):

    def __init__(self):
        super().__init__()
        self._status = None
        self._owner = None
        self._module = None
        self._project_type = None
        self._semester = None
        self._capacity = ""
        self._external_partner_list = ""
        self._short_description = ""
        self._flag = ""
        self._bd_before_lecture_period = ""
        self._bd_during_lecture_period = ""
        self._bd_during_exam_period = ""
        self._preferred_bd_during_lecture_period = ""
        self._special_room = ""
        self._language = ""
        self._room = ""

    def set_status(self, status):
        self._status = status

    def get_status(self):
        return self._status

    def set_module(self, module):
        self._module = module

    def get_module(self):
        return self._module

    def set_owner(self, person):
        self._owner = person

    def get_owner(self):
        return self._owner

    def set_project_type(self, project_type):
        self._project_type = project_type

    def get_project_type(self):
        return self._project_type

    def set_semester(self, semester):
        self._semester = semester

    def get_semester(self):
        return self._semester

    def set_capacity(self, value):
        self._capacity = value

    def get_capacity(self):
        return self._capacity

    def set_external_partner_list(self ,value):
        self._external__partner_list = value

    def get_external_partner_list(self):
        return self._external__partner_list

    def set_short_description(self, value):
        self._short_description = value

    def get_short_description(self):
        return self._short_description

    def set_flag(self, value):
        self._flag = value

    def get_flag(self):
        return self._flag

    def set_bd_before_lecture_period(self, value):
        self._bd_before_lecture_period = value

    def get_bd_before_lecture_period(self):
        return self._bd_before_lecture_period

    def set_bd_during_lecture_period(self, value):
        self._bd_during_lecture_period = value

    def get_bd_during_lecture_period(self):
        return self._bd_during_lecture_period

    def set_bd_during_exam_period(self, value):
        self._bd_during_exam_period = value

    def get_bd_during_exam_period(self):
        return self._bd_during_exam_period

    def set_preferred_bd_during_lecture_period(self, value):
        self._preferred_bd_during_lecture_period = value

    def get_preferred_bd_during_lecture_period(self):
        return self._preferred_bd_during_lecture_period

    def set_special_room(self, value):
        self._special_room = value

    def get_special_room(self):
        return self._special_room

    def set_language(self, value):
        self._language = value

    def get_language(self):
        return self._language

    def set_room(self, value):
        self._room = value

    def get_room(self):
        return self._room

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der Projektinhaber."""
        return "Project: {}, owned by {}".format(self.get_id(), self._owner)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Project()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_creation_time(dictionary["creation_time"])
        obj.set_semester(dictionary["semester"])
        obj.set_module(dictionary["module"])
        obj.set_short_description(dictionary["short_description"])
        obj.set_external_partner_list(dictionary["external_partner_list"])
        obj.set_capacity(dictionary["capacity"])
        obj.set_bd_during_exam_period(dictionary["bd_during_exam_period"])
        obj.set_bd_before_lecture_period(dictionary["bd_before_lecture_period"])
        obj.set_bd_during_lecture_period(dictionary["bd_during_lecture_period"])
        obj.set_preferred_bd_during_lecture_period(dictionary["preferred_bd_during_lecture_period"])
        obj.set_language(dictionary["language"])
        obj.set_room(dictionary["room"])
        obj.set_special_room(dictionary["special_room"])
        obj.set_flag(dictionary["flag"])
        obj.set_name(dictionary["name"])
        obj.set_status(dictionary["status"])
        obj.set_project_type(dictionary["project_type"])
        obj.set_owner(dictionary["owner"])
        return obj