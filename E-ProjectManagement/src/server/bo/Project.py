from server.bo import BusinessObject as bo
from server.bo import NamedBusinessObject as nbo
from server.bo.Module import Module as mbo
from server.bo import Person as pbo
from server.bo import ProjectType as ptbo
from server.bo import Semester as sbo
from server.bo import Person as pbo
from server.bo import Module as mbo
from server.bo import Status

class Project:

    def __init__(self):
        super().__init__()
        self._status = None
        self._owner= None
        self._module = None
        self._project_typ = None
        self._time = None
        self._capacity= ""
        self._external__partner_list= ""
        self._short_description= ""
        self._flag =""
        self._bd_before_lecture_period= ""
        self._bd_during_lecture_period=""
        self._bd_during_exam_period=""
        self._preferred_bd_during_lecture_period=""
        self._special_room=""
        self._language=""
        self._room=""

    def set_status(self, status):
        self._project_typ = status

    def get_status(self):
        return self._status

    def set_module(self,module):
        self._module = module

    def get_module(self):
        return self._module

    def set_owner(self, person):
        self._owner = person

    def get_owner(self):
        return self._owner

    def set_project_typ(self, projecttyp):
        self._project_typ = projecttyp

    def get_project_typ(self):
        return self._project_typ

    def set_time(self, semester):
        self._time = semester

    def get_time(self):
        return self._time

    def set_capacity(self,value):
        self._capacity= value

    def get_capacity(self):
        return self._capacity

    def set_external_partner_list(self,value):
        self._external__partner_list= value

    def get_external_partner_list(self):
        return self._external__partner_list

    def set_short_description(self,value):
        self._short_description= value

    def get_short_description(self):
        return self._short_description

    def set_flag(self,value):
        self._flag= value

    def get_flag(self):
        return self._flag

    def set_bd_before_lecture_period(self,value):
        self._bd_before_lecture_period= value

    def get_bd_before_lecture_period(self):
        return self._bd_before_lecture_period

    def set_bd_during_lecture_period(self,value):
        self._bd_during_lecture_period= value

    def get_bd_during_lecture_period(self):
        return self._bd_during_lecture_period

    def set_bd_during_exam_period(self,value):
        self._bd_during_exam_period= value

    def get_bd_during_exam_period(self):
        return self._bd_during_exam_period

    def set_preferred_bd_during_lecture_period(self,value):
        self._preferred_bd_during_lecture_period= value

    def get_preferred_bd_during_lecture_period(self):
        return self._preferred_bd_during_lecture_period

    def set_special_room(self,value):
        self._special_room= value

    def get_special_room(self):
        return self._special_room

    def set_language(self,value):
        self._language = value

    def get_language(self):
        return self._language

    def set_room(self,value):
        self._room= value

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
        obj.set_status(dictionary["status"])
        obj.set_owner(dictionary["owner"])
        obj.set_module(dictionary["module"])
        obj.set_typ(dictionary["typ"])
        obj.set_time(dictionary["time"])
        obj.set_capacity(dictionary["capacity"])
        obj.set_external_partner_list(["external_partner_list"])
        obj.set_short_description(["short_description"])
        obj.set_flag(["flag"])
        obj.set_bd_before_lecture_period(["bd_before_lecture_period"])
        obj.set_bd_during_lecture_period(["bd_during_lecture_period"])
        obj.set_bd_during_exam_period(["bd_during_exam_period"])
        obj.set_preferred_bd_during_lecture_period(["preferred_bd_during_lecture_period"])
        obj.set_special_room(["special_room"])
        obj.set_language(["language"])
        obj.set_room(["room"])


        return obj