from server.bo.Person import Person
from server.bo.Student import Student
from server.bo.Role import Role
from server.bo.Project import Project
from server.bo.ProjectType import ProjectType
from server.bo.Module import Module
from server.bo.Semester import Semester
from server.bo.Participation import Participation
from server.bo.Rating import Rating

from server.db.PersonMapper import PersonMapper
from server.db.StudentMapper import StudentMapper
from server.db.RoleMapper import RoleMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.ProjectType import ProjectTypeMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.RatingMapper import RatingMapper



def __init__(self):
    pass

"""
person-spezifische Methoden
"""
def person(self,id, name, role, google_id):
    """Einen Benutzer anlegen"""
    person = Person()
    person.set_name(name)
    person.set_role(role)
    person.set_google_id(google_id)
    person.set_id(id)
    person.set_id(1)

    with PersonMapper() as mapper:
        return mapper.insert(person)

def get_person_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with PersonMapper() as mapper:
        return mapper.find_person_by_name(name)

def get_person_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with PersonMapper() as mapper:
        return mapper.find_by_key(id)

def get_person_by_role(self, role):
    """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
    with PersonMapper() as mapper:
        return mapper.find_person_by_role(role)

def get_person_by_google_user_id(self, google_id):
    """Den Benutzer mit der gegebenen Google ID auslesen."""
    with PersonMapper() as mapper:
        return mapper.find_by_google_user_id(google_id)

def get_all_person(self):
    """Alle Benutzer auslesen."""
    with PersonMapper() as mapper:
        return mapper.find_all()

def save_user(self, person):
    """Den gegebenen Benutzer speichern."""
    with PersonMapper() as mapper:
        mapper.update(person)

def delete_user(self, person):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with PersonMapper() as mapper:
        mapper.delete(person)

"""Projektspezifisch"""


def create_project(self, name, owner, module, language, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status, time, projecttype):
    """Ein Projekt anlegen"""
    project = Project()
    project.set_name(name)
    project.set_owner(owner)
    project.set_module(module)
    project.set_language(language)
    project.set_capacity(capacity)
    project.set_external_partner_list(external_partner_list)
    project.set_short_description(short_description)
    project.set_flag(flag)
    project.set_bd_before_lecture_period(bd_before_lecture_period)
    project.set_bd_during_lecture_period(bd_during_lecture_period)
    project.set_bd_during_exam_period(bd_during_exam_period)
    project.set_preferred_bd_during_lecture_period(preferred_bd_during_lecture_period)
    project.get_special_room(special_room)
    project.set_room(room)
    project.set_status(status)
    project.set_projecttype(projecttype)
    project.set_time(time)
    project.set_id(1)

    with ProjectMapper() as mapper:
        return mapper.insert(project)


def get_project_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with ProjectMapper() as mapper:
        return mapper.find_by_name(name)


def get_project_by_owner(self, owner):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ProjectMapper() as mapper:
        return mapper.find_project_by_owner(owner)


def get_project_by_status(self, status):
    """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
    with ProjectMapper() as mapper:
        return mapper.find_project_by_status(status)



def get_all_projects(self):
    """Alle Benutzer auslesen."""
    with ProjectMapper() as mapper:
        return mapper.find_all()


def save_project(self, project):
    """Den gegebenen Benutzer speichern."""
    with ProjectMapper() as mapper:
        mapper.update(project)


def delete_project(self, project):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with ProjectMapper() as mapper:
        mapper.delete(project)

def get_project_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ProjectMapper() as mapper:
        return mapper.find_by_key(id)

"""Modulspezifische Methoden"""


def create_module(self, id, name, edv_nr):
    """Ein Projekt anlegen"""
    module = Module()
    module.set_name(name)
    module.set_edv_nr(edv_nr)
    module.set_id(id)
    module.set_id(1)

    with ModuleMapper() as mapper:
        return mapper.insert(module)


def get_module_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_by_name(name)


def get_module_by_edv_nr(self, edv_nr):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_by_edv_nr(edv_nr)


def get_all_modules(self):
    """Alle Benutzer auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_all()


def save_module(self, module):
    """Den gegebenen Benutzer speichern."""
    with ModuleMapper() as mapper:
        mapper.update(module)


def delete_module(self, module):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with ModuleMapper() as mapper:
        mapper.delete(module)


def get_module_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_by_key(id)


"""Modulspezifische Methoden"""


def create_projecttype(self, id, name, ects, sws):
    """Ein Projekt anlegen"""
    projecttype = ProjectType()
    projecttype.set_name(name)
    projecttype.set_ects(ects)
    projecttype.set_sws(sws)
    projecttype.set_id(id)
    projecttype.set_id(1)

    with ProjectTypeMapper() as mapper:
        return mapper.insert(projecttype)


def get_projecttype_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with ProjectTypeMapper() as mapper:
        return mapper.find_by_name(name)


def get_all_projecttype(self):
    """Alle Benutzer auslesen."""
    with ProjectTypeMapper() as mapper:
        return mapper.find_all()


def save_projecttype(self, projecttype):
    """Den gegebenen Benutzer speichern."""
    with ProjectTypeMapper() as mapper:
        mapper.update(projecttype)


def delete_projecttype(self, projecttype):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with ProjectTypeMapper() as mapper:
        mapper.delete(projecttype)


def get_projecttype_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ProjectTypeMapper() as mapper:
        return mapper.find_by_key(id)

"""Ratingspezifische Methoden"""


def create_rating(self, id, evaluator, to_be_assessed, grade, passed):
    """Ein Projekt anlegen"""
    rating = Rating()
    rating.set_evaluator(evaluator)
    rating.set_to_be_assessed(to_be_assessed)
    rating.set_grade(grade)
    rating.set_passed(passed)
    rating.set_id(id)
    rating.set_id(1)

    with RatingMapper() as mapper:
        return mapper.insert(rating)


def get_rating_by_student(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_by_name(name)


def get_rating_evaluator(self, edv_nr):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with ModuleMapper() as mapper:
        return mapper.find_by_edv_nr(edv_nr)
'BEARBEITEN!--> MAPPER'

def get_all_ratings(self):
    """Alle Benutzer auslesen."""
    with RatingMapper() as mapper:
        return mapper.find_all()


def save_rating(self, rating):
    """Den gegebenen Benutzer speichern."""
    with RatingMapper() as mapper:
        mapper.update(rating)


def delete_rating(self, rating):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with RatingMapper() as mapper:
        mapper.delete(rating)


def get_rating_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with RatingMapper() as mapper:
        return mapper.find_by_key(id)

"""Studentenspezifische Methoden"""


def create_student(self, id, person, course_abbr, matriculation_nr):
    """Ein Projekt anlegen"""
    student = Student()
    student.set_person(person)
    student.set_course_abbr(course_abbr)
    student.set_matriculation_nr(matriculation_nr)
    student.set_id(id)
    student.set_id(1)

    with StudentMapper() as mapper:
        return mapper.insert(student)


def get_student_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with StudentMapper() as mapper:
        return mapper.find_by_name(name)


def get_student_by_matriculation_nr(self, matriculation_nr):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with StudentMapper() as mapper:
        return mapper.find_student_by_matriculation_nr(matriculation_nr)

def get_student_by_course_abbr(self, course_abbr):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with StudentMapper() as mapper:
        return mapper.find_student_by_course_abbr(course_abbr)


def get_all_students(self):
    """Alle Benutzer auslesen."""
    with StudentMapper() as mapper:
        return mapper.find_all()


def save_student(self, student):
    """Den gegebenen Benutzer speichern."""
    with StudentMapper() as mapper:
        mapper.update(student)


def delete_student(self, student):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with StudentMapper() as mapper:
        mapper.delete(student)


def get_student_by_id(self, id):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with StudentMapper() as mapper:
        return mapper.find_by_key(id)