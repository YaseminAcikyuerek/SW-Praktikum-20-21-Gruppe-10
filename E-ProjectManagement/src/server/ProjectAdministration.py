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


def create_project(self, name, owner, module_id, language, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status, semester_id, projecttype_id):
    """Einen Benutzer anlegen"""
    user = User()
    user.set_name(name)
    user.set_email(email)
    user.set_user_id(google_user_id)
    user.set_id(1)

    with UserMapper() as mapper:
        return mapper.insert(user)


def get_user_by_name(self, name):
    """Alle Benutzer mit Namen name auslesen."""
    with UserMapper() as mapper:
        return mapper.find_by_name(name)


def get_user_by_id(self, number):
    """Den Benutzer mit der gegebenen ID auslesen."""
    with UserMapper() as mapper:
        return mapper.find_by_key(number)


def get_user_by_email(self, email):
    """Alle Benutzer mit gegebener E-Mail-Adresse auslesen."""
    with UserMapper() as mapper:
        return mapper.find_by_email(email)


def get_user_by_google_user_id(self, id):
    """Den Benutzer mit der gegebenen Google ID auslesen."""
    with UserMapper() as mapper:
        return mapper.find_by_google_user_id(id)


def get_all_users(self):
    """Alle Benutzer auslesen."""
    with UserMapper() as mapper:
        return mapper.find_all()


def save_user(self, user):
    """Den gegebenen Benutzer speichern."""
    with UserMapper() as mapper:
        mapper.update(user)


def delete_user(self, user):
    """Den gegebenen Benutzer aus unserem System löschen."""
    with UserMapper() as mapper:
        mapper.delete(user)