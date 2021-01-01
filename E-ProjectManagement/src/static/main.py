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
from server.bo.DEA import DEA
from server.bo.Student import Student


# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
from static.SecurityDecorator import secured

"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)

CORS(app, resources=r'/Eproject/*')

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""
api = Api(app, version='1.0', title='ProjectManagement API',
    description='Ein Projektmanagement System für eine Hochschule.')

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Bank-relevanten Operationen unter dem Präfix /bank zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /bank/v1, /bank/v2 usw."""
projectmanagement = api.namespace('projectmanagement', description='Funktionen des Projekt-Systems')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
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
    'owner': fields.Integer(attribute='_owner', description='unique ID des Projektbesitzers'),
    'language': fields.String(attribute='_language', description='Sprache des Projekts'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Kapazität des Projekts'),
    'external_partner_list': fields.String(attribute='_external_partner_list', description='Die externen Partner des Projektes'),
    'flag': fields.Boolean(attribute='_flag', description='Sonderzeichen ob das Projekt wöchentlich stattfindet'),
    'bd_before_lecture_period': fields.Integer(attribute='_bd_before_lecture_period', description=''),
    'bd_during_lecture_period': fields.Integer(attribute='_bd_during_lecture_period', description=''),
    'bd_during_exam_period': fields.Integer(attribute='_bd_during_exam_period', description=''),
    'preferred_bd_during_lecture_period': fields.Integer(attribute='_preferred_bd_during_lecture_period', description=''),
    'special_room': fields.Boolean(attribute='_special_room', description=''),
    'room': fields.String(attribute='_room', description=''),
    'status': fields.String(attribute='_status', description=''),

    'project_type': fields.Integer(attribute='_project_type', description=''),
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
    'role_name': fields.String(attribute='_role_name', description='Name der Rolle')
})

semester = api.inherit('Semester', nbo, {
    'start': fields.Date(attribute='_start', description='Start des Semesters'),
    'end': fields.Date(attribute='_end', description='Ende des Semesters')
})

status = api.inherit('Status', {
    'status': fields.String(attribute='_status', description='Name des Zustands')
})

student = api.inherit('Student', bo, {
    'person': fields.Integer(attribute='_person', description='unique ID der Person'),
    'course_abbr': fields.String(attribute='_course_abbr', description='Studiengang des Studenten'),
    'matriculation_nr': fields.Integer(attribute='_matriculation_nr', description='Matrikelnummer des Studenten')
})

@projectmanagement.route('/person')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonListOperations(Resource):
    @secured
    @projectmanagement.marshal_list_with(person)
    def get(self):
        """Auslesen aller Person-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_person()
        return persons

    @projectmanagement.marshal_with(person, code=200)
    @projectmanagement.expect(person)  # Wir erwarten ein Person-Objekt von Client-Seite.
    def post(self):
        """Anlegen eines neuen Person-Objekts.
        """
        adm = ProjectAdministration()

        proposal = Person.from_dict(api.payload)

        if proposal is not None:
            per = adm.create_person(proposal.get_name(), proposal.get_role())
            return per, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@projectmanagement.route('/person/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Customer-Objekts')
class PersonOperations(Resource):
    @projectmanagement.marshal_with(person)

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

    @projectmanagement.marshal_with(person)
    @projectmanagement.expect(person, validate=True)

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

@projectmanagement.route('/person/<string:name>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('Name', 'Der Name einer Person')
class PersonByNameOperations(Resource):
    @projectmanagement.marshal_with(person)

    def get(self, name):
        """ Auslesen von einer Person anhand des Namens
        Auszulesende Objekt wird anhand des Namens bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_name(name)
        return pers


@projectmanagement.route('/project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @projectmanagement.marshal_list_with(project)

    def get(self):
        """Auslesen aller Projekte."""

        adm = ProjectAdministration()
        proj = adm.get_all_project()
        return proj


@projectmanagement.route('/project/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Project-Objekts')
class ProjectOperations(Resource):
    @projectmanagement.marshal_with(project)

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
        proj.delete_account(proj)
        return '', 200

    @projectmanagement.marshal_with(project)

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


@projectmanagement.route('/person/<int:id>/project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Person-Objekts')
class PersonRelatedProjectOperations(Resource):
    @projectmanagement.marshal_with(project)
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

    @projectmanagement.marshal_with(project, code=201)

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


@projectmanagement.route('/project/<int:id>/status')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projekts')
class ProjectStatusOperations(Resource):
    @projectmanagement.doc('Read status of given project')

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

@projectmanagement.route('/student')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListOperations(Resource):
    @projectmanagement.marshal_list_with(student)

    def get(self):
        """Auslesen aller Student-Objekte.
        """
        adm = ProjectAdministration()
        stu = adm.get_all_student()
        return stu

    @projectmanagement.marshal_with(student, code=200)
    @projectmanagement.expect(student)

    def post(self):
        """Anlegen eines neuen student-Objekts.
        """
        adm = ProjectAdministration()

        stu = Student.from_dict(api.payload)

        if stu is not None:
            """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            stu = adm.create_student(stu.get_id(), stu.get_person(), stu.get_course_abbr(), stu.get_matriculation_nr())
            return stu, 200
        else:
            return '', 500


@projectmanagement.route('/student/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Student-Objekts')
class StudentOperations(Resource):
    @projectmanagement.marshal_with(student)

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

    @projectmanagement.route('/student/<int:id>/project')
    @projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
    @projectmanagement.param('id', 'Die ID des student-Objekts')
    class StudentRelatedProjectOperations(Resource):
        @projectmanagement.marshal_with(project)

        def get(self, id):
            """Auslesen aller Projekte von eines bestimmten Studenten.

            Das student-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
            """
            adm = ProjectAdministration()
            stu = adm.get_student_by_id(id)

            if stu is not None:

                project_list = adm.get_project_of_student(stu)
                return project_list
            else:
                return "Student not found", 500





    @projectmanagement.marshal_with(rating)

    def put(self, id):
        """Update eines bestimmten Student-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        std = Student.from_dict(api.payload)

        if std is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Transaction-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            std.set_id(id)
            adm.save_student(std)
            return '', 200
        else:
            return '', 500



@projectmanagement.route('/student-project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentProjectOperations(Resource):
    @projectmanagement.marshal_with(project)

    def get(self):
        """Auslesen des Kassenkontos (Cash Account) der Bank.

        Sollten keine Cash Account-Objekt verfügbar sein, so wird Response Status 500 zurückgegeben."""
        adm = ProjectAdministration()
        acc = adm.get_cash_account()
        if acc is not None:
            return acc
        else:
            return '', 500

@projectmanagement.route('/participation')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    @projectmanagement.marshal_list_with(participation)

    def get(self):
        """Auslesen aller Participation-Objekte.
        """
        adm = ProjectAdministration()
        p = adm.get_all_participation()
        return p

    @projectmanagement.marshal_with(participation, code=200)
    @projectmanagement.expect(participation)

    def post(self):
        """Anlegen eines neuen Participation-Objekts.
        """
        adm = ProjectAdministration()

        p = Participation.from_dict(api.payload)

        if p is not None:
            pa = adm.create_participation(p.get_id(), p.get_project(), p.get_student())
            return pa, 200
        else:
            return '', 500

@projectmanagement.route('/participation/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID der Participation-Objekts')
class ParticipationOperations(Resource):
    @projectmanagement.marshal_with(participation)

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

    @projectmanagement.marshal_with(participation)


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

@projectmanagement.route('/semester/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @projectmanagement.marshal_with(semester)

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
        semes = adm.get_semester_by_key(id)
        adm.delete_semester(semes)
        return '', 200

    @projectmanagement.marshal_with(semester)
    @projectmanagement.expect(semester, validate=True)

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

@projectmanagement.route('/project/<int:id>/module')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Modul-Objekts')
class ModuleRelatedProjectOperations(Resource):
    @projectmanagement.marshal_with(project)
    def get(self, id):
        """Auslesen aller Projekte von eines bestimmten Moduls.
        """
        adm = ProjectAdministration()
        proj = adm.get_project_by_module(id)

        return proj

    @projectmanagement.marshal_with(project, code=201)

    def post(self, id):
        """Anlegen eines Projekts für ein gegebenes Modul.

        Das neu angelegte Projekt wird als Ergebnis zurückgegeben.
        """
        adm = ProjectAdministration()
        mod = adm.get_module_by_id(id)

        if mod is not None:
            result = adm.create_project(mod)
            return result
        else:
            return "Module unknown", 500

@projectmanagement.route('/semester/<int:id>/project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Semester-Objekts')
class SemesterRelatedProjectOperations(Resource):
    @projectmanagement.marshal_with(project)

    def get(self, id):
        """Auslesen aller Projekte von einem bestimmten Semester.

        Das Semester-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(id)

        if sem is not None:
            project_list = adm.get_project_of_semester(sem)
            return project_list
        else:
            return "Semester not found", 500

    @projectmanagement.marshal_with(project, code=201)

    def post(self, id):
        """Anlegen eines Projekts für ein gegebenes Semester.

        Das neu angelegte Projekt wird als Ergebnis zurückgegeben.
        """
        adm = ProjectAdministration()
        sem = adm.get_semester_by_id(id)

        if sem is not None:
            result = adm.create_project_for_semester(sem)
            return result
        else:
            return "Semester unknown", 500

@projectmanagement.route('/projecttype/<int:id>/project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projecttypes-Objekts')
class ProjectTypeRelatedProjectOperations(Resource):
    @projectmanagement.marshal_with(project)

    def get(self, id):
        """Auslesen aller Projekte von einer bestimmten Projektart.

        Das ProjectType-Objekt dessen Projekte wir lesen möchten, wird durch id bestimmt.
        """
        adm = ProjectAdministration()
        pt = adm.get_projecttype_by_id(id)

        if pt is not None:

            project_list = adm.get_project_for_projecttype(pt)
            return project_list
        else:
            return "Project Type not found", 500

    @projectmanagement.marshal_with(project, code=201)

    def post(self, id):
        """Anlegen eines Projekts für eine gegebene Projektart.

        Das neu angelegte Projekt wird als Ergebnis zurückgegeben."""
        adm = ProjectAdministration()
        pt = adm.get_projecttype_by_id(id)

        if pt is not None:
            result = adm.create_project_for_projecttype(pt)
            return result
        else:
            return "Projecttype unknown", 500

@projectmanagement.route('/module')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleListOperations(Resource):
    @projectmanagement.marshal_list_with(module)

    def get(self):
        """Auslesen aller Module-Objekte.
        """
        adm = ProjectAdministration()
        m = adm.get_all_module()
        return m

    @projectmanagement.marshal_with(module, code=200)
    @projectmanagement.expect(module)

    def post(self):
        """Anlegen eines neuen Modul-Objekts.
        """
        adm = ProjectAdministration()
        m = Module.from_dict(api.payload)

        if m is not None:
            modu = adm.create_module(m.get_id(),m.get_name(), m.get_edv_nr())
            return modu, 200
        else:
            return '', 500

@projectmanagement.route('/module/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Module-Objekts')
class ModuleOperations(Resource):
    @projectmanagement.marshal_with(module)

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

    @projectmanagement.marshal_with(module)
    @projectmanagement.expect(module, validate=True)

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


@projectmanagement.route('/participation/<int:id>student')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID der Person-Objekts')
class ParticipationStudentOperations(Resource):
    @projectmanagement.marshal_with(participation, student)

    def get(self, id):
        """Auslesen aller Participation-Objekte eines bestimmten Studenten .

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)  # Suche nach Student mit vorgegebener id

        if stu is not None:
            participation_list= adm.get_participation_of_student(stu)
            return participation_list

        else:
            return "Student not found",500


    @projectmanagement.marshal_with(participation, code=201)

    def post(self, id):
        """Anlegen einer Participation für einen gegebenen Studenten.

        Das neu angelegte Participation wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Student existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        stu = adm.get_participation_for_student(id)

        if stu is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
            result = adm.create_participation_for_student(stu)
            return result
        else:
            return "Student unknown", 500


@projectmanagement.route('/project/<int:id>/participation')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projekt-Objekts')
class ParticipationProjectOperations(Resource):
    @projectmanagement.marshal_with(participation)

    def get(self, id):
        """Auslesen aller Participation-Objekte bzgl. eines bestimmten Projekt-Objekts.

        Das Projekt-Objekt dessen Participation wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir die Projekt durch eine eine gegebene Id.
        project = adm.get_project_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Participation-Objekt bekommen?
        if project is not None:
            # Jetzt erst lesen wir die die Teilnahmeliste anhand der Module aus.
            participation_list = adm.get_participation_by_project(project)
            return participation_list
        else:
            return "Project not found", 500

    @projectmanagement.marshal_with(participation, code=201)

    def post(self, id):
        """Anlegen einer Participation für einen gegebenes Modul.

        Die neu angelegte Participation wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Participation existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        mod1 = adm.get_all_participation_by_id(id)

        if mod1 is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
            result = adm.create_participation_for_module(mod1)
            return result
        else:
            return "Module unknown", 500



@projectmanagement.route('/rating')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RatingListOperations(Resource):
    @projectmanagement.marshal_list_with(rating)

    def get(self):
        """Auslesen aller rating-Objekte.

        Sollten keine Rating-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        r = adm.get_all_rating()
        return r

    @projectmanagement.marshal_with(rating, code=200)
    @projectmanagement.expect(rating)  # Wir erwarten ein rating-Objekt von Client-Seite.

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
            r = adm.create_rating(rat.get_id(), rat.get_evaluator(), rat.get_to_be_assessed(),rat.get_passed(),rat.get_grade())
            return r, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500




@projectmanagement.route('/rating/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Rating-Objekts')
class RatingOperations(Resource):
    @projectmanagement.marshal_with(rating)

    def get(self, id):
        """Auslesen eines bestimmten Rating-Objekts.

        Das auszulesende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        ra = adm.get_rating_by_id(id)
        return ra

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Rating-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        ra = adm.get_rating_by_id(id)
        adm.delete_rating(ra)
        return '', 200

    @projectmanagement.marshal_with(rating)

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

@projectmanagement.route('/student/<int:id>/rating')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des student-Objekts')
class StudentRelatedRatingOperations(Resource):
    @projectmanagement.marshal_with(rating)

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

    @projectmanagement.marshal_with(project, code=201)

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

@projectmanagement.route('/project/<int:id>/rating')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedRatingOperations(Resource):
    @projectmanagement.marshal_with(project)

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

    @projectmanagement.marshal_with(rating, code=201)

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


@projectmanagement.route('/role')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RoleListOperations(Resource):
    @projectmanagement.marshal_list_with(role)

    def get(self):
        """Auslesen aller Role-Objekte."""
        adm = ProjectAdministration()
        ro = adm.get_all_role()
        return ro

    @projectmanagement.marshal_with(role, code=200)
    @projectmanagement.expect(role)

    def post(self):
        """Anlegen eines neuen Role-Objekts.
        """
        adm = ProjectAdministration()

        ro= Role.from_dict(api.payload)

        if ro is not None:
            r = adm.create_role(ro.get_name(), ro.get_id())
            return r, 200
        else:
            return '', 500


@projectmanagement.route('/role/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Role-Objekts')
class RoleOperations(Resource):
    @projectmanagement.marshal_with(role)

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
        ro = adm.get_role_by_key(id)
        adm.delete_role(ro)
        return '', 200

    @projectmanagement.marshal_with(role)
    @projectmanagement.expect(role, validate=True)

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

@projectmanagement.route('/projecttype')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @projectmanagement.marshal_list_with(project_type)

    def get(self):
        """Auslesen aller Projecttype-Objekte.
        """
        adm = ProjectAdministration()
        pt = adm.get_all_projecttype()
        return pt


@projectmanagement.route('/projecttype/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projecttype-Objekts')
class ProjectTypeOperations(Resource):
    @projectmanagement.marshal_with(project_type)

    def get(self, id):
        """Auslesen eines bestimmten Projecttype-Objekts.
        """
        adm = ProjectAdministration()
        pt = adm.get_all_projecttype_by_id(id)
        return pt


    def delete(self, id):
        """Löschen eines bestimmten projecttype-Objekts.

        Das zu löschende Objekt wird durch die ```id``` bestimmt.
        """
        adm = ProjectAdministration()
        pt = adm.get_all_projecttype_by_id(id)
        adm.delete_projecttype(pt)
        return '', 200

    @projectmanagement.marshal_with(project_type)
    @projectmanagement.expect(project_type, validate=True)

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
            adm.save_projecttype(pt)
            return '', 200
        else:
            return '', 500

if __name__ == '__main__':
    app.run(debug=True)
















