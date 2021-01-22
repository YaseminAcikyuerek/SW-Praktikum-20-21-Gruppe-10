 # Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück

from server.ProjectAdministration import ProjectAdministration
from server.bo.Person import Person
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Module import Module
from server.bo.Rating import Rating
from server.bo.ProjectType import ProjectType
from server.bo.Semester import Semester
from server.bo.Role import Role
'''***from server.bo.Automaton import DEA'''
from server.bo.Student import Student


# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
"""from SecurityDecorator import secured"""

"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)

CORS(app, resources=r'/management/*')

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""
api = Api(app, version='1.0', title='ProjectManagement API',
    description='Ein Projektmanagement System für eine Hochschule.')

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Bank-relevanten Operationen unter dem Präfix /management zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /management/v1, /management/v2 usw."""
management = api.namespace('management', description='Funktionen des Projekt-Systems')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen  und  aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_time': fields.DateTime(attribute='_creation_time', description='Erstellungszeitpunkt des Objekts')
})

nbo = api.model('NamedBusinessObject', {
    'name': fields.String(attribute='_name', description='Der Name eines Named Business Object'),
})

user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
})

module = api.inherit('Module', bo, nbo, {
    'edv_nr': fields.String(attribute='_edv_nr', description='EDV_Nr des Moduls')
})

participation = api.inherit('Participation', bo, {
    'project': fields.Integer(attribute='_project', description='unique ID vom Projekt'),
    'student': fields.Integer(attribute='_student', description='unique ID vom Studenten')
})

person = api.inherit('Person', bo, nbo, {
    'role': fields.Integer(attribute='_role', description='unique ID des Rollennamens'),
})

project = api.inherit('Project', bo, nbo, {
    'semester': fields.Integer(attribute='_semester', description=''),
    'module': fields.Integer(attribute='_module', description='unique ID des Projektmoduls'),
    'short_description': fields.String(attribute='_short_description', description='Die kurze Beschreibung des Projekts'),
    'external_partner_list': fields.String(attribute='_external_partner_list', description='Die externen Partner des Projektes'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Kapazität des Projekts'),
    'bd_during_exam_period': fields.Integer(attribute='_bd_during_exam_period', description=''),
    'bd_before_lecture_period': fields.Integer(attribute='_bd_before_lecture_period', description=''),
    'bd_during_lecture_period': fields.Integer(attribute='_bd_during_lecture_period', description=''),
    'preferred_bd_during_lecture_period': fields.Integer(attribute='_preferred_bd_during_lecture_period', description=''),
    'language': fields.String(attribute='_language', description='Sprache des Projekts'),
    'room': fields.String(attribute='_room', description=''),
    'special_room': fields.Boolean(attribute='_special_room', description=''),
    'flag': fields.Boolean(attribute='_flag', description='Sonderzeichen ob das Projekt wöchentlich stattfindet'),
    'status': fields.String(attribute='_status', description=''),
    'owner': fields.Integer(attribute='_owner', description='unique ID des Projektbesitzers'),
    'project_type': fields.Integer(attribute='_project_type', description='')
})

project_type = api.inherit('ProjectType', bo, nbo, {
    'sws': fields.Integer(attribute='_sws', description='SWS der Projektart'),
    'ects': fields.Integer(attribute='_ects', description='ECTS der Projektart')
})

rating = api.inherit('Rating', bo, {
    'project': fields.Integer(attribute='_project', description='unique ID des zu beurteilenden Projektes'),
    'evaluator': fields.Integer(attribute='_evaluator', description='unique ID des Beurteilers'),
    'to_be_assessed': fields.Integer(attribute='_to_be_assessed', description='unique ID des zu beurteilenden Studenten'),
    'grade': fields.Float(attribute='_grade', description='Note'),
    'passed': fields.Boolean(attribute='_passed', description='Bestanden bzw. nicht bestehen sein des Projekts')
})

role = api.inherit('Role', {
    'id': fields.Integer(attribute='_id', description='id der Rolle'),
    'name': fields.String(attribute='_name',description='nameder Rolle')
})

semester = api.inherit('Semester', bo, nbo, {
    'start': fields.Date(attribute='_start', description='Start des Semesters'),
    'end': fields.Date(attribute='_end', description='Ende des Semesters')
})

status = api.inherit('Status', {
    'status': fields.String(attribute='_status', description='Name des Zustands')
})

student = api.inherit('Student', bo,nbo, {

    'matriculation_nr': fields.String(attribute='_matriculation_nr', description='Matrikelnummer des Studenten'),
    'course_abbr': fields.String(attribute='_course_abbr', description='Studiengangskuerzel des Studenten')
})

@management.route('/persons')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):

    @management.marshal_list_with(person)
    def get(self):
        """Auslesen aller Person-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_person()
        return persons

    @management.marshal_with(person, code=200)
    @management.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    def post(self):
        """Anlegen eines neuen Person-Objekts.
        """
        adm = ProjectAdministration()

        proposal = Person.from_dict(api.payload)

        if proposal is not None:
            per = adm.create_person(proposal.get_creation_time(),proposal.get_name(), proposal.get_role())
            return per, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@management.route('/person/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Person-Objekts')
class PersonOperations(Resource):
    @management.marshal_with(person)

    def get(self, id):
        """Auslesen einer bestimmten Person-BO.

        Objekt wird durch die id in bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        return pers


    def delete(self, id):
        """Löschen einer bestimmten Person-BO.

        Löschende Objekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        adm.delete_person(pers)
        return '', 200

    @management.marshal_with(person)
    @management.expect(person, validate=True)

    def put(self, id):
        """Update einer bestimmten Person.
        """
        adm = ProjectAdministration()
        p = Person.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_person(p)
            return '', 200
        else:
            return '', 500


@management.route('/projects')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @management.marshal_list_with(project)


    def get(self):
        """Auslesen aller Projekte."""

        adm = ProjectAdministration()
        proj = adm.get_all_project()
        return proj

    """Projektspezifische Methoden"""
    @management.marshal_with(project)
    @management.expect(project)
    def post(self):
        """Anlegen eines neuen Projekt-Objekts.
                """
        adm = ProjectAdministration()
        proj = Project.from_dict(api.payload)

        if proj is not None:
            pro = adm.create_project(proj.get_id(), proj.get_creation_time(),proj.get_semester(), proj.get_module(), proj.get_short_description(),
                                     proj.get_external_partner_list(), proj.get_capacity(),
                                     proj.get_bd_during_exam_period(), proj.get_bd_before_lecture_period(),
                                     proj.get_bd_during_lecture_period(), proj.get_preferred_bd_during_lecture_period(),
                                     proj.get_language(), proj.get_room(), proj.get_special_room(), proj.get_flag(),
                                     proj.get_name(), proj.get_status(), proj.get_project_type(),
                                     proj.get_owner())
            return pro, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@management.route('/project/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Project-Objekts')
class ProjectOperations(Resource):
    @management.marshal_with(project)


    def get(self, id):
        """Auslesen eines bestimmten Projekts.

        Auszulesende Projekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        proj = adm.get_project_by_id(id)
        return proj


    def delete(self, id):
        """Löschen eines bestimmten Projekts.

        Löschende Objekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        proj = adm.get_project_by_id(id)
        adm.delete_project(id)
        return '', 200

    @management.marshal_with(project)
    @management.expect(project)
    def put(self, id):
        """Update eines bestimmten Projekts.
        """
        adm = ProjectAdministration()
        p = Project.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_project(p)
            return '', 200
        else:
            return '', 500



@management.route('/person/<int:id>/project')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Person-Objekts')
class PersonRelatedProjectOperations(Resource):
    @management.marshal_with(project)
    def get(self, id):
        """Auslesen aller Projekte von einer bestimmten Person.

        Das Person-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir den durch id gegebener Person.
        pers = adm.get_person_by_id(id)

        if pers is not None:

            project_list = adm.get_project_by_owner(pers)
            return project_list
        else:
            return "Person not found", 500

    @management.marshal_with(project, code=201)

    def post(self, id):
        """Anlegen eines Projekts für eine gegebene Person.

        Das neu angelegte Projekt wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss eine Person existieren, die die Rolle
        eines Dozenten hat, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id Person gibt, mit der Rolle Dozent. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        pers = adm.get_person_by_id(id)

        if pers is not None:
            result = adm.create_project_for_person(pers)
            return result
        else:
            return "Person unknown", 500


@management.route('/project/<int:id>/status')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Projekts')
class ProjectStatusOperations(Resource):
    @management.doc('Read status of given project')

    def get(self, id):
        """Auslesen des Status eines Projekts.

        Das Projekt das wir auslesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        proj = adm.get_project_by_id(id)

        if proj is not None:
            status = adm.get_status_of_project(proj)
            return status
        else:
            return 0, 500


"""Studentenspezifische Methoden"""
@management.route('/student')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListOperations(Resource):
    @management.marshal_list_with(student)

    def get(self):
        """Auslesen aller Student-Objekte.
        """
        adm = ProjectAdministration()
        stu = adm.get_all_student()
        return stu

    @management.marshal_with(student, code=200)
    @management.expect(student)

    def post(self):
        """Anlegen eines neuen student-Objekts.
        """
        adm = ProjectAdministration()

        std = Student.from_dict(api.payload)

        if std is not None:
            """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            s = adm.create_student (std.get_creation_time(),std.get_name(),std.get_matriculation_nr(),std.get_course_abbr())
        else:
            return '', 500


@management.route('/student/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Student-Objekts')
class StudentOperations(Resource):
    @management.marshal_with(student)

    def get(self, id):
        """Auslesen eines bestimmten Student-Objekts.

        Auszulesende Objekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)
        return stu


    def delete(self, id):
        """Löschen eines bestimmten student-Objekts.

        Löschende Objekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)
        adm.delete_student(stu)
        return '', 200


    @management.marshal_with(student)
    @management.expect(student)

    def put(self, id):
        """Update eines bestimmten Student-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        stu = Student.from_dict(api.payload)

        if stu is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Transaction-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            stu.set_id(id)
            adm.save_student(stu)
            return '', 200
        else:
            return '', 500

@management.route('/student/<int:id>/project')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des student-Objekts')
class StudentRelatedProjectOperations(Resource):
    @management.marshal_with(project)

    def get(self, id):
            """Auslesen aller Projekte von eines bestimmten Studenten.

            Das student-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
            """
            adm = ProjectAdministration()
            stu = adm.get_student_by_id(id)

            if stu is None:

                return "Student not found", 500
            else:
                project_list = adm.get_project_of_student(stu)
                return project_list


@management.route('/participation')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    @management.marshal_list_with(participation)

    def get(self):
        """Auslesen aller Participation-Objekte.
        """
        adm = ProjectAdministration()
        p = adm.get_all_participation()
        return p

    @management.marshal_with(participation, code=200)
    @management.expect(participation)

    def post(self):
        """Anlegen eines neuen Participation-Objekts.
        """
        adm = ProjectAdministration()

        p = Participation.from_dict(api.payload)

        if p is not None:
            pa = adm.create_participation(p.get_id(),p.get_creation_time(), p.get_project(), p.get_student())
            return pa, 200
        else:
            return '', 500

@management.route('/participation/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID der Participation-Objekts')
class ParticipationOperations(Resource):
    @management.marshal_with(participation)

    def get(self, id):
        """Auslesen eines bestimmten Participation-Objekts.

        Auszulesende Objekt wird durch die id bestimmt.
        """
        adm = ProjectAdministration()
        p = adm.get_participation_by_id(id)
        return p


    def delete(self, id):
        """Löschen eines bestimmten Participation-Objekts.

        Das zu löschende Objekt wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        p = adm.get_participation_by_id(id)
        adm.delete_participation(p)
        return '', 200

    @management.marshal_with(participation)


    def put(self, id):
        """Update eines bestimmten Participation-Objekts.
        """
        adm = ProjectAdministration()
        p = Participation.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.save_participation(p)
            return '', 200
        else:
            return '', 500
@management.route('/semester')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterListOperations(Resource):
    @management.marshal_list_with(semester)

    def get(self):
        """Auslesen aller Semester-Objekte.

        Sollten keine Semester-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        s = adm.get_all_semester()
        return s

    @management.marshal_with(semester, code=200)
    @management.expect(semester)  # Wir erwarten ein rating-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Semester-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        se = Semester.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if se is not None:
            """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            s = adm.create_semester(se.get_creation_time(),se.get_name(),se.get_start(),se.get_end())
            return s, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@management.route('/semester/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @management.marshal_with(semester)

    def get(self, id):
        """Auslesen eines bestimmten Semester-Objekts.

        Das auszulesende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(id)
        return sem


    def delete(self, id):
        """Löschen eines bestimmten Semester-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        semes = adm.get_semester_by_id(id)
        adm.delete_semester(semes)
        return '', 200

    @management.marshal_with(semester)
    @management.expect(semester)

    def put(self, id):
        """Update eines bestimmten Semester-Objekts.

        """
        adm = ProjectAdministration()
        sem = Semester.from_dict(api.payload)

        if sem is not None:
            sem.set_id(id)
            adm.save_semester(sem)
            return '', 200
        else:
            return '', 500


@management.route('/rating')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RatingListOperations(Resource):
    @management.marshal_list_with(rating)
    def get(self):
        """Auslesen aller rating-Objekte.

        Sollten keine Rating-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        r = adm.get_all_rating()
        return r

    @management.marshal_with(rating, code=200)
    @management.expect(rating)  # Wir erwarten ein rating-Objekt von Client-Seite.
    def post(self):
            """Anlegen eines neuen Rating-Objekts.

            **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
            So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
            Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
            liegt es an der BankAdministration (Businesslogik), eine korrekte ID
            zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
            """
            adm = ProjectAdministration()

            rat = Rating.from_dict(api.payload)

            """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
            if rat is not None:
                """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
                eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
                wird auch dem Client zurückgegeben. 
                """
                r = adm.create_rating(rat.get_creation_time(),rat.get_project(), rat.get_evaluator(), rat.get_to_be_assessed(), rat.get_grade(),
                                      rat.get_passed())
                return r, 200
            else:
                # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
                return '', 500


@management.route('/rating/<int:id>/project')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Projekt-Objekts')
class RatingRelatedProjectOperations(Resource):
    @management.marshal_with(project)
    def get(self, id):
        """Auslesen aller Bewertungen von eines bestimmten Projekts.
        """
        adm = ProjectAdministration()
        proj = adm.get_rating_by_project(id)

        return proj

@management.route('/participation/<int:id>/student')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Student-Objekts')
class RatingRelatedProjectOperations(Resource):
    @management.marshal_with(project)

    def get(self, id):
        """Auslesen aller Projekte von einem bestimmten Studenten.

        Das Student-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        sem = adm.get_student_by_id(id)

        if sem is not None:
            project_list = adm.get_projects_of_student(sem)
            return project_list
        else:
            return "Student not found", 500




@management.route('/modules')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleListOperations(Resource):
    @management.marshal_list_with(module)

    def get(self):
        """Auslesen aller Module-Objekte.
        """
        adm = ProjectAdministration()
        m = adm.get_all_module()
        return m

    @management.marshal_with(module, code=200)
    @management.expect(module)

    def post(self):
        """Anlegen eines neuen Modul-Objekts.
        """
        adm = ProjectAdministration()
        m = Module.from_dict(api.payload)

        if m is not None:
            modu = adm.create_module(m.get_id(),m.get_creation_time(),m.get_name(), m.get_edv_nr())
            return modu, 200
        else:
            return '', 500

@management.route('/module/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Module-Objekts')
class ModuleOperations(Resource):
    @management.marshal_with(module)

    def get(self, id):
        """Auslesen eines bestimmten Module-Objekts anhand der id.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        mo = adm.get_module_by_id(id)
        return mo

    def delete(self, id):
        """Löschen eines bestimmten Module-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        mo = adm.get_module_by_id(id)
        adm.delete_module(mo)
        return '', 200

    @management.marshal_with(module)
    @management.expect(module, validate=True)

    def put(self, id):
        """Update eines bestimmten Moduler-Objekts.
        """
        adm = ProjectAdministration()
        mo = Module.from_dict(api.payload)

        if mo is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            mo.set_id(id)
            adm.save_module(mo)
            return '', 200
        else:
            return '', 500


@management.route('/student/<int:id>participation')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID der Person-Objekts')
class ParticipationStudentOperations(Resource):
    @management.marshal_with(participation)

    def get(self, id):
        """Auslesen aller Participation-Objekte eines bestimmten Studenten .

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
         # Suche nach Student mit vorgegebener id
        stu = adm.get_participation_of_student(id)
        if stu is not None:
            participation_list = adm.get_participation_of_student(stu)
            return participation_list

        else:
            return "Student not found",500


    @management.marshal_with(participation, code=201)
    @management.expect(participation)


    def post(self, id):
        """Anlegen einer Participation für einen gegebenen Studenten.

        Das neu angelegte Participation wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Student existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        stu = adm.get_participation_of_student(id)

        if stu is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
            result = adm.create_participation_for_student(stu)
            return result
        else:
            return "Student unknown", 500


@management.route('/project/<int:id>/participation')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Projekt-Objekts')
class ParticipationProjectOperations(Resource):
    @management.marshal_with(participation)

    def get(self, id):
        """Auslesen aller Participation-Objekte bzgl. eines bestimmten Projekt-Objekts.

        Das Projekt-Objekt dessen Participation wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir die Projekt durch eine eine gegebene Id.
        pro = adm.get_project_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Participation-Objekt bekommen?
        if pro is not None:
            # Jetzt erst lesen wir die die Teilnahmeliste anhand der Module aus.
            participation_list = adm.get_participation_by_project(pro)
            return participation_list
        else:
            return "Project not found", 500

    @management.marshal_with(participation, code=201)

    def post(self, id):
        """Anlegen einer Participation für einen gegebenes Projekt.

        Die neu angelegte Participation wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Participation existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        mod1 = adm.get_all_participation_by_id(id)

        if mod1 is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
            result = adm.create_participation_for_project(mod1)
            return result
        else:
            return "Module unknown", 500



@management.route('/rating')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RatingListOperations(Resource):
    @management.marshal_list_with(rating)

    def get(self):
        """Auslesen aller rating-Objekte.

        Sollten keine Rating-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        r = adm.get_all_rating()
        return r

    @management.marshal_with(rating, code=200)
    @management.expect(rating)  # Wir erwarten ein rating-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Rating-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        rat = Rating.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if rat is not None:
            """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            r = adm.create_rating(rat.get_creation_time(),rat.get_project(), rat.get_evaluator(), rat.get_to_be_assessed(),rat.get_grade(),rat.get_passed())
            return r, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500




@management.route('/rating/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Rating-Objekts')
class RatingOperations(Resource):
    @management.marshal_with(rating)

    def get(self, id):
        """Auslesen eines bestimmten Rating-Objekts.

        Das auszulesende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        ra = adm.get_rating_by_id(id)
        return ra


    def delete(self, id):
        """Löschen eines bestimmten Rating-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        ra = adm.get_rating_by_id(id)
        adm.delete_rating(ra)
        return '', 200

    @management.marshal_with(rating)
    @management.expect(rating)

    def put(self, id):
        """Update eines bestimmten Rating-Objekts.
        """
        adm = ProjectAdministration()
        ra = Rating.from_dict(api.payload)

        if ra is not None:
            ra.set_id(id)
            adm.save_rating(ra)
            return '', 200
        else:
            return '', 500

@management.route('/student/<int:id>/rating')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des student-Objekts')
class StudentRelatedRatingOperations(Resource):
    @management.marshal_with(rating)

    def get(self, id):
        """Auslesen aller Bewertungen von einer bestimmten Student.

        Das Student-Objekt dessen Bewertungen wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)

        if stu is not None:
            rating_list = adm.get_rating_of_student(stu)
            return rating_list
        else:
            return "Student not found", 500

    @management.marshal_with(project, code=201)

    def post(self, id):
        """Anlegen einer Bewertung für ein gegebenen Studenten.

        Die neu angelegte Bewertung wird als Ergebnis zurückgegeben.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)

        if stu is not None:
            result = adm.create_participation_for_student(stu)
            return result
        else:
            return "Student unknown", 500

@management.route('/project/<int:id>/rating')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedRatingOperations(Resource):
    @management.marshal_with(project)

    def get(self, id):
        """Auslesen aller Bewertungen von einem bestimmten Projekt.

        Das Projekt-Objekt dessen Bewertungen wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.get_project_by_id(id)

        if pro is not None:
            rating_list = adm.get_rating_of_project(pro)
            return rating_list
        else:
            return "Project not found", 500

    @management.marshal_with(rating, code=201)

    def post(self, id):
        """Anlegen einer Bewertung für eine gegebenes Projekt.

        Die neu angelegte Bewertung wird als Ergebnis zurückgegeben.
        """
        adm = ProjectAdministration()
        pro = adm.get_project_by_id(id)

        if pro is not None:
            result = adm.create_rating_for_project(pro)
            return result
        else:
            return "Project unknown", 500


@management.route('/role')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RoleListOperations(Resource):
    @management.marshal_list_with(role)

    def get(self):
        """Auslesen aller Role-Objekte."""
        adm = ProjectAdministration()
        r = adm.get_all_role()
        return r

    @management.marshal_with(role, code=200)
    @management.expect(role)

    def post(self):
        """Anlegen eines neuen Role-Objekts.
        """
        adm = ProjectAdministration()

        rose= Role.from_dict(api.payload)

        if rose is not None:
            r = adm.create_role(rose.get_name())
            return r, 200
        else:
            return '', 500


@management.route('/role/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Role-Objekts')
class RoleOperations(Resource):
    @management.marshal_with(role)

    def get(self, id):
        """Auslesen eines bestimmten Role-Objekts.

        Das auszulesende Objekt wird durch die id bestimmt.
        """
        adm = ProjectAdministration()
        ro = adm.get_role_by_id(id)
        return ro


    def delete(self, id):
        """Löschen eines bestimmten Role-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        ro = adm.get_role_by_id(id)
        adm.delete_role(ro)
        return '', 200

    @management.marshal_with(role)
    @management.expect(role, validate=True)

    def put(self, id):
        """Update eines bestimmten role-Objekts.
        """
        adm = ProjectAdministration()
        ro = Role.from_dict(api.payload)

        if ro is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ro.set_id(id)
            adm.save_role(ro)
            return '', 200
        else:
            return '', 500

@management.route('/project_type')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @management.marshal_list_with(project_type)

    def get(self):
        """Auslesen aller Projecttype-Objekte.
        """
        adm = ProjectAdministration()
        pt = adm.get_all_project_type()
        return pt

    @management.marshal_with(project_type)
    @management.expect(project_type)
    def post(self):
        """Anlegen eines neuen ProjectTypes-Objekts.
                """
        adm = ProjectAdministration()
        prot = ProjectType.from_dict(api.payload)

        if prot is not None:
            r = adm.create_project_type(prot.get_creation_time(),prot.get_name(), prot.get_sws(),prot.get_ects())
            return r, 200
        else:
            return '', 500

@management.route('/project_type/<int:id>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('id', 'Die ID des Projecttype-Objekts')
class ProjectTypeOperations(Resource):
    @management.marshal_with(project_type)

    def get(self, id):
        """Auslesen eines bestimmten Projecttype-Objekts.
        """
        adm = ProjectAdministration()
        pt = adm.get_project_type_by_id(id)
        return pt


    def delete(self, id):
        """Löschen eines bestimmten projecttype-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        pt = adm.get_project_type_by_id(id)
        adm.delete_project_type(pt)
        return '', 200

    @management.marshal_with(project_type)
    @management.expect(project_type, validate=True)

    def put(self, id):
        """Update eines bestimmten Projecttype-Objekts.
        """
        adm = ProjectAdministration()
        pt = ProjectType.from_dict(api.payload)

        if pt is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pt.set_id(id)
            adm.save_project_type(pt)
            return '', 200
        else:
            return '', 500

@management.route('/person-by-name/<string:name>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('name', 'Der Name der Person')
class PersonByNameOperations(Resource):
    @management.marshal_with(person)

    def get(self, name):
        """ Auslesen von Personen-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        per = adm.get_person_by_name(name)
        return per

@management.route('/project-by-name/<string:name>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('name', 'Der Name des Projekts')
class ProjectByNameOperations(Resource):
    @management.marshal_with(project)

    def get(self, name):
        """ Auslesen von Projekt-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```lastname``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.get_project_by_name(name)
        return pro

@management.route('/student-by-name/<string:name>')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@management.param('name', 'Der Name des Studenten')
class StudentByNameOperations(Resource):
    @management.marshal_with(student)

    def get(self, name):
        """ Auslesen von Student-Objekten, die durch den Namen bestimmt werden.

        Die auszulesenden Objekte werden durch ```name``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_name(name)
        return stu

@management.route('/projects')
@management.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @management.doc('Create a new state of project')
    @management.marshal_with(project, code=201)
    @management.expect(project)
    def put(self, id):
        """Update eines bestimmten Projekts.
        """
        adm = ProjectAdministration()
        p = Project.from_dict(api.payload)

        if p is not None:
            p.set_status(id)
            adm.save_project(p)
            return '', 200
        else:
            return '', 500

if __name__ == '__main__':
    app.run(debug=True)























