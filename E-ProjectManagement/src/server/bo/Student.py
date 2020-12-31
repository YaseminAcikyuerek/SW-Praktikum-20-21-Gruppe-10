from server.bo.Person import Person as pbo


class Student(pbo):

    def __init__(self):
        super().__init__()
        self._course_abbr = ""
        self._matriculation_nr = ""

    def set_course_abbr(self, value):
        self._course_abbr = value

    def get_course_abbr(self):
        return self._course_abbr

    def set_matriculation_nr(self, value):
        self._matriculation_nr = value

    def get_matriculation_nr(self):
        return self._matriculation_nr


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Student()."""
        obj = Student()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_person(dictionary["name"])
        obj.set_course_abbr(dictionary["course_abbr"])
        obj.set_matriculation_nr(dictionary["matriculation_nr"])
        return obj
