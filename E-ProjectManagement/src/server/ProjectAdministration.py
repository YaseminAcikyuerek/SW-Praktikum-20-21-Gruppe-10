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
from server.db.ProjectTypeMapper import ProjectTypeMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.RatingMapper import RatingMapper


class ProjectAdministration(object):

    def __init__(self):
        pass

    """person-spezifische Methoden"""

    def create_person(self,creation_time, name, role):
        """Eine Person anlegen"""
        p = Person()
        p.set_id(1)
        p.set_creation_time(creation_time)
        p.set_name(name)
        p.set_role(role)

        with PersonMapper() as mapper:
            return mapper.insert(p)

    def get_person_by_name(self, name):
        """"Alle Personen mit Namen name auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_name(name)

    def get_person_by_id(self, id):
        """Die Person mit der gegebenen ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_id(id)

    def get_person_by_role(self, role):
        """Alle Personen mit gegebener Rolle auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_person_by_role(role)

    def get_person_by_google_user_id(self, google_id):
        """Die Person mit der gegebenen Google ID auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_by_google_user_id(google_id)

    def get_all_person(self):
        """Alle Personen auslesen."""
        with PersonMapper() as mapper:
            return mapper.find_all()

    def save_person(self, person):
        """Die gegebene Person speichern."""
        with PersonMapper() as mapper:
            return mapper.update(person)

    def delete_person(self, person):
        """Die gegebenen Person aus unserem System löschen."""
        with PersonMapper() as mapper:
            mapper.delete(person)

    """Projektspezifisch"""

    def create_project(self,id,creation_time, semester, module, short_description, external_partner_list, capacity,
                       bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
                       preferred_bd_during_lecture_period, language, room, special_room, flag, name,
                       status, project_type, owner):
        """Ein Projekt anlegen"""
        project = Project()
        project.set_id(id)
        project.set_creation_time(creation_time)
        project.set_semester(semester)
        project.set_module(module)
        project.set_short_description(short_description)
        project.set_external_partner_list(external_partner_list)
        project.set_capacity(capacity)
        project.set_bd_during_exam_period(bd_during_exam_period)
        project.set_bd_before_lecture_period(bd_before_lecture_period)
        project.set_bd_during_lecture_period(bd_during_lecture_period)
        project.set_preferred_bd_during_lecture_period(preferred_bd_during_lecture_period)
        project.set_language(language)
        project.set_room(room)
        project.set_special_room(special_room)
        project.set_flag(flag)
        project.set_name(name)
        project.set_status(status)
        project.set_project_type(project_type)
        project.set_owner(owner)
        project.set_id(1)


        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_project_by_name(self, name):
        """Alle Projekte mit Namen name auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_by_name(name)

    def get_project_by_owner(self, owner):
        """Das Projekt mit gegebenem Benutzer auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_project_by_owner(owner)

    def get_project_by_status(self, status):
        """AlleP rojekte mit gegebenem status auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_project_by_status(status)

    def get_all_project(self):
        """Alle Projekte auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def save_project(self, project):
        """Das gegebene Projekt speichern."""
        with ProjectMapper() as mapper:
            mapper.update(project)

    def delete_project(self, project):
        """Das gegebene Projekt aus unserem System löschen."""
        with ProjectMapper() as mapper:
            mapper.delete(project)

    def get_project_by_id(self, id):
        """Das Projekt mit der gegebenen ID auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_by_id(id)

    """Modulspezifische Methoden"""

    def create_module(self, id,creation_time, name, edv_nr):
        """Ein Modul anlegen"""
        module = Module()
        module.set_name(name)
        module.set_edv_nr(edv_nr)
        module.set_id(id)
        module.set_creation_time(creation_time)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)

    def get_module_by_name(self, name):
        """Alle Module mit Namen name auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_module_by_edv_nr(self, edv_nr):
        """Das Modul mit der gegebenen edv_nr auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_edv_nr(edv_nr)

    def get_all_modules(self):
        """Alle Module auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def save_module(self, mo):
        """Das gegebene Modul speichern."""
        with ModuleMapper() as mapper:
            mapper.update(mo)


    def delete_module(self, module):
        """Den gegebenen Modul aus unserem System löschen."""
        with ModuleMapper() as mapper:
            mapper.delete(module)

    def get_module_by_id(self, id):
        """Das Modul mit der gegebenen ID auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_id(id)

    """Modulspezifische Methoden"""

    def create_project_type(self,creation_time, name, sws, ects):
        """Ein Projekttyp anlegen"""
        project_type = ProjectType()
        project_type.set_creation_time(creation_time)
        project_type.set_name(name)
        project_type.set_sws(sws)
        project_type.set_ects(ects)
        project_type.set_id(1)

        with ProjectTypeMapper() as mapper:
            return mapper.insert(project_type)

    def get_project_type_by_name(self, name):
        """Alle Projekttypen mit Namen name auslesen."""
        with ProjectTypeMapper() as mapper:
            return mapper.find_by_name(name)

    def get_all_project_type(self):
        """Alle Projekttypen auslesen."""
        with ProjectTypeMapper() as mapper:
            return mapper.find_all()

    def save_project_type(self, project_type):
        """Den gegebenen Projekttypen speichern."""
        with ProjectTypeMapper() as mapper:
            mapper.update(project_type)

    def delete_project_type(self, projecttype):
        """Den gegebenen Projekttypen aus unserem System löschen."""
        with ProjectTypeMapper() as mapper:
            mapper.delete(projecttype)

    def get_project_type_by_id(self, id):
        """Den Projekttypen mit der gegebenen ID auslesen."""
        with ProjectTypeMapper() as mapper:
            return mapper.find_by_id(id)

    """Ratingspezifische Methoden"""

    def create_rating(self,creation_time, project, evaluator, to_be_assessed, grade, passed):
        """Ein Rating anlegen"""
        rating = Rating()
        rating.set_creation_time(creation_time)
        rating.set_project(project)
        rating.set_evaluator(evaluator)
        rating.set_to_be_assessed(to_be_assessed)
        rating.set_grade(grade)
        rating.set_passed(passed)
        rating.set_id(1)

        with RatingMapper() as mapper:
            return mapper.insert(rating)

    def get_rating_by_student(self, name):
        """Alle Ratings mit Namen name auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_rating_evaluator(self, edv_nr):
        """Das Rating vom Evaluator auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_edv_nr(edv_nr)



    def get_all_rating(self):
        """Alle Ratings auslesen."""
        with RatingMapper() as mapper:
            return mapper.find_all()

    def save_rating(self, rating):
        """Das gegebene Rating speichern."""
        with RatingMapper() as mapper:
            mapper.update(rating)

    def delete_rating(self, rating):
        """Das gegebene Rating aus unserem System löschen."""
        with RatingMapper() as mapper:
            mapper.delete(rating)


    def get_rating_by_id(self, id):
        """Das Rating mit der gegebenen ID auslesen."""
        with RatingMapper() as mapper:
            return mapper.find_by_id(id)

    """Studentenspezifische Methoden"""

    def create_student(self,creation_time, name,matriculation_nr, course_abbr):
        """Einen Studenten  anlegen"""
        student = Student()
        student.set_creation_time(creation_time)
        student.set_name(name)
        student.set_matriculation_nr(matriculation_nr)
        student.set_course_abbr(course_abbr)
        student.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

    def get_student_by_name(self, name):
        """Alle Studenten mit Namen name auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)

    def get_student_by_matriculation_nr(self, matriculation_nr):
        """Den Studenten mit der gegebenen matriculaton_nr auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_student_by_matriculation_nr(matriculation_nr)

    def get_student_by_course_abbr(self, course_abbr):
        """Den Studenten mit der gegebenen course_abbr auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_student_by_course_abbr(course_abbr)

    def get_all_student(self):
        """Alle Studenten auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def save_student(self, student):
        """Den gegebenen Studenten speichern."""
        with StudentMapper() as mapper:
            mapper.update(student)

    def delete_student(self, student):
        """Den gegebenen Studenten aus unserem System löschen."""
        with StudentMapper() as mapper:
            mapper.delete(student)

    def get_student_by_id(self, id):
        """Den Studenten mit der gegebenen ID auslesen."""
        with StudentMapper() as mapper:
            return mapper.find_by_id(id)

    """Rollenspezifische"""

    def create_role(self, name):
        """Eine Rolle  anlegen"""
        role = Role()
        role.set_name(name)
        role.set_id(1)

        with RoleMapper() as mapper:
            return mapper.insert(role)

    def get_role_by_name(self, name):
        """Alle Rollen mit Namen name auslesen."""
        with RoleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_role_by_id(self, id):
        """Die Rollen mit der gegebenen ID auslesen."""
        with RoleMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_role(self):
        """Alle Rollen auslesen."""
        with RoleMapper() as mapper:
            return mapper.find_all()

    def save_role(self, role):
        """Den gegebenen Rollen speichern."""
        with RoleMapper() as mapper:
            mapper.update(Role)

    def delete_role(self, role):
        """Die gegebene Rolle aus unserem System löschen."""
        with RoleMapper() as mapper:
            mapper.delete(role)

    """Participationspezifische"""

    def create_participation(self, id, creation_time, project, student):
        """Einen Teilnahme anlegen"""

        participation = Participation()
        participation.set_creation_time(creation_time)
        participation.set_project(project)
        participation.set_student(student)
        participation.set_id(id)
        participation.set_id(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(participation)


    def get_all_participation_by_id(self, id):
        """Die Teilnahme mit der gegebenen ID auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_participation_by_id(self, id):
        """Die Teilnahme mit der gegebenen ID auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_participation_of_student(self, stu):
        with ParticipationMapper() as mapper:
            return mapper.find_participation_of_student(stu)


    def get_all_participation(self):
        """Alle Teilnahmen auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_all()

    def update_participation(self, participation):
        """Die Teilnahme updaten."""
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        """Den gegebenen Teilnahme aus unserem System löschen."""
        with ParticipationMapper() as mapper:
            mapper.delete(participation)

    def insert_participaion(self, participation):
        """Die Teilnahme einfügen"""
        with ParticipationMapper() as mapper:
            mapper.insert(participation)

    def save_participation(self, participation):
        """die Teilnahme speichern"""
        with ParticipationMapper() as mapper:
            mapper.update(participation)


    """Semesterspezifische"""

    def create_semester(self, creation_time, name, start, end):
        """Ein Semester anlegen"""
        semester = Semester()
        semester.set_creation_time(creation_time)
        semester.set_name(name)
        semester.set_start(start)
        semester.set_end(end)
        semester.set_id(1)


        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_semester_by_name(self, name):
        """Alle semeester mit Namen name auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_semester_by_name(name)

    def get_semester_by_id(self, id):
        """Das Semester mit der gegebenen ID auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_semester(self):
        """Alle Semester auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def update_semester(self, semester):
        """Das Semester updaten"""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """Das Semester aus unserem System löschen."""
        with SemesterMapper() as mapper:
            mapper.delete(semester)

    def insert_semester(self, semester):
        """Das Semester einfügen"""
        with SemesterMapper() as mapper:
            mapper.insert(semester)

    def save_semester(self, semester):
        """das Semester speichern"""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def get_all_module(self):
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def get_project_by_module(self, module):
        with ProjectMapper() as mapper:
            return mapper.find_project_by_module(module)

    def get_project_type_for_project(self, project_type):
        with ProjectTypeMapper() as mapper:
            mapper.insert(project_type)


    def create_participation_for_student(self,creation_time,project,student):
        participation = Participation()
        participation.set_creation_time(creation_time)
        participation.set_project(project)
        participation.set_student(student)
        participation.set_id(1)
        with ParticipationMapper() as mapper:
            mapper.find_participation_of_student(student)


    def create_participation_for_project(self,creation_time, project, student):
        participation = Participation()
        participation.set_creation_time(creation_time)
        participation.set_project(project)
        participation.set_student(student)
        participation.set_id(1)
        with ParticipationMapper() as mapper:
            mapper.find_participation_of_project(project)

    def get_participation_for_project(self, pro):
        with ParticipationMapper() as mapper:
            return mapper.find_participation_of_project(pro)














