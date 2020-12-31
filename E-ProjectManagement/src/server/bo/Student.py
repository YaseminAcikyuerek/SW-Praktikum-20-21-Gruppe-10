from server.bo import BusinessObject as bo
from server.bo import NamedBusinessObject as nbo
from server.bo import Person as pbo


class Student(bo, nbo, pbo):

    def __init__(self):
        super.__init__()
        self._person= None
        self._course_abbr = ""
        self._matriculation_nr = ""

    def set_person(self,person):
        self._person = person

    def get_person(self):
        return self._person

    def set_course_abbr(self,value):
        self._course_abbr = value

    def get_course_abbr(self):
        return self._course_abbr

    def set_matriculation_nr(self,value):
        self._matriculation_nr = value

    def get_matriculation_nr(self):
        return self._matriculation_nr


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Student()."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_person(dictionary["person"])
        obj.set_course_abbr(dictionary["course_abbr"])
        obj.set_matriculation_nr(dictionary["matriculation_nr"])
        return obj
