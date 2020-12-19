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

user = api.inherit('User', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'email': fields.String(attribute='_email', description='E-Mail-Adresse eines Benutzers'),
    'user_id': fields.String(attribute='_user_id', description='Google User ID eines Benutzers')
})

module = api.inherit('Module', bo, {
    'name': fields.String(attribute='_name', description='Name des Moduls'),
    'edv_nr': fields.String(attribute='_edv_nr', description='EDV_Nr des Moduls')
})

participation = api.inherit('Participation', bo, {
    'project': fields.String(attribute='_project', description='unique ID vom Projekt'),
    'student': fields.String(attribute='_student', description='unique ID vom Studenten')
})

person = api.inherit('Person', bo, {
    'name': fields.String(attribute='_name', description='Name der Person'),
    'role': fields.String(attribute='_role', description='unique ID der Rolle'),
    'user_id': fields.Integer(attribute='_user_id', description='externe ID die von Google übergeben wird')
})

project = api.inherit('Project', bo, {
    'name': fields.String(attribute='_name', description='Name des Projekts'),
    'owner': fields.Integer(attribute='_owner',description='unique ID des Projektbesitzers'),
    'module': fields.Integer(attribute='_module',description='unique ID des Projektmoduls'),
    'language': fields.String(attribute='_language',description='Sprache des Projekts'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Kapazität des Projekts'),
    'external_partner_list': fields.String(attribute='_external_partner_list', description='Die externen Partner des Projektes'),
    'short_description': fields.String(attribute='_short_description', description='Die kurze Beschreibung des Projekts'),
    'flag': fields.Boolean(attribute='_flag', description='Sonderzeichen ob das Projekt wöchentlich stattfindet'),
    'bd_before_lecture_period': fields.Integer(attribute='_bd_before_lecture_period', description=''),
    'bd_during_lecture_period': fields.Integer(attribute='bd_during_lecture_period', description=''),
    'bd_during_exam_period': fields.Integer(attribute='bd_during_exam_period', description=''),
    'preferred_bd_during_lecture_period': fields.Integer(attribute='preferred_bd_during_lecture_period', description=''),
    'special_room': fields.Boolean(attribute='special_room', description=''),
    'room': fields.String(attribute='_room', description=''),
    'status': fields.String(attribute='_status', description=''),
    'semester_id': fields.Integer(attribute='_semester_id', description=''),
    'projecttype_id':fields.Integer(attribute='_projecttype_id', description=''),
})

projecttype = api.inherit('ProjectType', bo, {
    'name': fields.String(attribute='_name', description='Name der Projektart'),
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

role = api.inherit('Role', bo, {
    'role_name': fields.String(attribute='_role_name', description='Name der Rolle')
})

semester = api.inherit('Semester', bo, {
    'name': fields.String(attribute='_name', description='Name des Semesters'),
    'start': fields.Date(attribute='_start', description='Start des Semesters'),
    'end': fields.Date(attribute='_end', description='Ende des Semesters')
})

status = api.inherit('Status', bo, {
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
    @projectmanagement.marshal_list_with(person)
    @secured
    def get(self):
        """Auslesen aller Person-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        persons = adm.get_all_person()
        return persons

    @projectmanagement.marshal_with(person, code=200)
    @projectmanagement.expect(person)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        proposal = Person.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            c = adm.create_person(proposal.get_name(), proposal.get_role())
            return c, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@projectmanagement.route('/person/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Customer-Objekts')
class CustomerOperations(Resource):
    @projectmanagement.marshal_with(person)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Customer-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        return pers

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Customer-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_id(id)
        adm.delete_customer(pers)
        return '', 200

    @projectmanagement.marshal_with(person)
    @projectmanagement.expect(person, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Customer-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        p = Person.from_dict(api.payload)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            p.set_id(id)
            adm.save_customer(p)
            return '', 200
        else:
            return '', 500

@projectmanagement.route('/person-by-name/<string:name>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('Name', 'Der Name einer Person')
class PersonByNameOperations(Resource):
    @projectmanagement.marshal_with(person)
    @secured
    def get(self, name):
        """ Auslesen von Customer-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```lastname``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pers = adm.get_person_by_name(name)
        return pers


@projectmanagement.route('/project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleListOperations(Resource):
    @projectmanagement.marshal_list_with(project)
    @secured
    def get(self):
        """Auslesen aller Acount-Objekte.

        Sollten keine Account-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        project = adm.get_all_project()
        return project


@projectmanagement.route('/project/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Project-Objekts')
class AccountOperations(Resource):
    @projectmanagement.marshal_with(module)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Account-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.get_module_by_id(id)
        return pro

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Account-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.get_project_by_id(id)
        pro.delete_account(pro)
        return '', 200

    @projectmanagement.marshal_with(project)
    @secured
    def put(self, id):
        """Update eines bestimmten Module-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        p = Project.from_dict(api.payload)

        if p is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
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
    @secured
    def get(self, id):
        """Auslesen aller Acount-Objekte bzgl. eines bestimmten Customer-Objekts.

        Das Customer-Objekt dessen Accounts wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir den durch id gegebenen Customer.
        pers = adm.get_person_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Customer-Objekt bekommen?
        if pers is not None:
            # Jetzt erst lesen wir die Konten des Customer aus.
            project_list = adm.get_project_of_person(pers)
            return project_list
        else:
            return "Person not found", 500

    @projectmanagement.marshal_with(project, code=201)
    @secured
    def post(self, id):
        """Anlegen eines Projekts für einen gegebenen Customer.

        Das neu angelegte Konto wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Customer existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        pers = adm.get_person_by_id(id)

        if pers is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
            result = adm.create_project_for_person(pers)
            return result
        else:
            return "Person unknown", 500


@projectmanagement.route('/project/<int:id>/status')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Account-Objekts')
class ProjectStatusOperations(Resource):
    @projectmanagement.doc('Read status of given project')
    @secured
    def get(self, id):
        """Auslesen des Kontostands bzw. des Saldos eines bestimmten Account-Objekts.

        Das Account-Objekt dessen Saldo wir auslesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir das durch id gegebene Konto.
        pro = adm.get_project_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Account-Objekt bekommen?
        if pro is not None:
            # Jetzt erst lesen wir den Saldo des Kontos aus.
            status = adm.get_status_of_project(pro)
            return status
        else:
            return 0, 500


@projectmanagement.route('/student-project')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentProjectOperations(Resource):
    @projectmanagement.marshal_with(project)
    @secured
    def get(self):
        """Auslesen des Kassenkontos (Cash Account) der Bank.

        Sollten keine Cash Account-Objekt verfügbar sein, so wird Response Status 500 zurückgegeben."""
        adm = ProjectAdministration()
        acc = adm.get_cash_account()
        if acc is not None:
            return acc
        else:
            return '', 500


@projectmanagement.route('/semester/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @projectmanagement.marshal_with(semester)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Semester-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        semestt = adm.get_semester_by_key(id)
        return semestt

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Semester-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        semes = adm.get_semester_by_key(id)
        adm.delete_semester(semes)
        return '', 200

    @projectmanagement.marshal_with(semester)
    @projectmanagement.expect(semester, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Semester-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        semest = Semester.from_dict(api.payload)

        if semest is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            semest.set_id(id)
            adm.save_semester(semest)
            return '', 200
        else:
            return '', 500



@projectmanagement.route('/module')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleListOperations(Resource):
    @projectmanagement.marshal_list_with(module)
    @secured
    def get(self):
        """Auslesen aller Module-Objekte.

        Sollten keine Module-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        m = adm.get_all_module()
        return m

    @projectmanagement.marshal_with(module, code=200)
    @projectmanagement.expect(module)  # Wir erwarten ein module-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Modul-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        mod = Module.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if mod is not None:
            """ Wir verwenden id, name, edv_nr eins Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            m = adm.create_module(mod.get_name(), mod.get_id(), mod.get_edv_nr())
            return m, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500



@projectmanagement.route('/module/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Module-Objekts')
class SemesterOperations(Resource):
    @projectmanagement.marshal_with(module)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Module-Objekts anhand der id.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        module= adm.get_module_by_id(id)
        return module

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Module-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        modu = adm.get_semester_by_key(id)
        adm.delete_semester(modu)
        return '', 200

    @projectmanagement.marshal_with(module)
    @projectmanagement.expect(module, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Moduler-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
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
            return '',


"""Participation"""

@projectmanagement.route('/participation')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationListOperations(Resource):
    @projectmanagement.marshal_list_with(participation)
    @secured
    def get(self):
        """Auslesen aller Participation-Objekte.

        Sollten keine Participation-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        p = adm.get_all_participation()
        return p

    @projectmanagement.marshal_with(participation, code=200)
    @projectmanagement.expect(participation)  # Wir erwarten ein Participation-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Participation-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        pa = Participation.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if pa is not None:
            """ Wir verwenden project, id, student Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            p = adm.create_participation(pa.get_project(), pa.get_id(), pa.get_student())
            return p, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500



@projectmanagement.route('/participation/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID der Participation-Objekts')
class ParticipationOperations(Resource):
    @projectmanagement.marshal_with(participation)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Participation-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        par = adm.get_participation_by_id(id)
        return par

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Participation-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        part = adm.get_participation_by_id(id)
        adm.delete_participation(part)
        return '', 200

    @projectmanagement.marshal_with(participation)
    @projectmanagement.expect(participation, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Participation-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        pare = Participation.from_dict(api.payload)

        if pare is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pare.set_id(id)
            adm.save_participation(pare)
            return '', 200
        else:
            return '', 500

    """TeilnahmeStudentoperationen"""




@projectmanagement.route('/participation/<int:id>student')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID der Person-Objekts')
class ParticipationStudentOperations(Resource):
    @projectmanagement.marshal_with(participation, student)
    @secured
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
    @secured
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


@projectmanagement.route('/participation/<int:id>/module')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Participation-Objekts')
class ParticipationModuleOperations(Resource):
    @projectmanagement.marshal_with(module)
    @secured
    def get(self, id):
        """Auslesen aller Participation-Objekte bzgl. eines bestimmten Module-Objekts.

        Das Participation-Objekt dessen Module wir lesen möchten, wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir die Participation durch eine eine gegebene Id.
        mod1= adm.get_participation_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Participation-Objekt bekommen?
        if mod1 is not None:
            # Jetzt erst lesen wir die die Teilnahmeliste anhand der Module aus.
            participation_list = adm.get_participation_of_module(mod1)
            return participation_list
        else:
            return "Module not found", 500

    @projectmanagement.marshal_with(participation, code=201)
    @secured
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
    @secured
    def get(self):
        """Auslesen aller rating-Objekte.

        Sollten keine Rating-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        r = adm.get_all_rating()
        return r

    @projectmanagement.marshal_with(rating, code=200)
    @projectmanagement.expect(rating)  # Wir erwarten ein rating-Objekt von Client-Seite.
    @secured
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
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Rating-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        rati = adm.get_rating_by_id(id)
        return rati

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Rating-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        ratin = adm.get_rating_by_id(id)
        adm.delete_rating(ratin)
        return '', 200

    @projectmanagement.marshal_with(rating)
    @secured
    def put(self, id):
        """Update eines bestimmten Rating-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        ra = Rating.from_dict(api.payload)

        if ra is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Transaction-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ra.set_id(id)
            adm.save_rating(ra)
            return '', 200
        else:
            return '', 500


@projectmanagement.route('/student')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentListOperations(Resource):
    @projectmanagement.marshal_list_with(student)
    @secured
    def get(self):
        """Auslesen aller Student-Objekte.

        Sollten keine student-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        ss = adm.get_all_student()
        return ss

    @projectmanagement.marshal_with(student, code=200)
    @projectmanagement.expect(student)  # Wir erwarten ein studentg-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen student-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        stud = Student.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if stud is not None:
            """ Wir verwenden id, evaluator, to_be_assessed, passed, grade des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            ss = adm.create_student(stud.get_id(), stud.get_person(), stud.get_course_abbr(),stud.get_matriculation_nr())
            return ss, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500




@projectmanagement.route('/student/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des student-Objekts')
class StudentOperations(Resource):
    @projectmanagement.marshal_with(student)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten student-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        stu = adm.get_student_by_id(id)
        return stu

    @secured
    def delete(self, id):
        """Löschen eines bestimmten student-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        studen = adm.get_student_by_id(id)
        adm.delete_student(studen)
        return '', 200

    @projectmanagement.marshal_with(rating)
    @secured
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
"""RollenOperationen"""


@projectmanagement.route('/role')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class RoleListOperations(Resource):
    @projectmanagement.marshal_list_with(role)
    @secured
    def get(self):
        """Auslesen aller Role-Objekte.

        Sollten keine Role-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        ro = adm.get_all_role()
        return ro

    @projectmanagement.marshal_with(role, code=200)
    @projectmanagement.expect(role)  # Wir erwarten ein Role-Objekt von Client-Seite.
    @secured
    def post(self):
        """Anlegen eines neuen Role-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = ProjectAdministration()

        rol= Role.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if rol is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines Customer-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            r = adm.create_role(rol.get_name(), rol.get_id())
            return r, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500


@projectmanagement.route('/role/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Role-Objekts')
class RoleOperations(Resource):
    @projectmanagement.marshal_with(role)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Role-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        rl = adm.get_role_by_key(id)
        return rl

    @secured
    def delete(self, id):
        """Löschen eines bestimmten Role-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        rolee = adm.get_role_by_key(id)
        adm.delete_role(rolee)
        return '', 200

    @projectmanagement.marshal_with(role)
    @projectmanagement.expect(role, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten role-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        rn = Role.from_dict(api.payload)

        if rn is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            rn.set_id(id)
            adm.save_role(rn)
            return '', 200
        else:
            return '', 500


@projectmanagement.route('/projecttype')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectTypeListOperations(Resource):
    @projectmanagement.marshal_list_with(projecttype)
    @secured
    def get(self):
        """Auslesen aller Projecttype-Objekte.

        Sollten keine Projecttyoe-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ProjectAdministration()
        pr = adm.get_all_projecttype()
        return pr



@projectmanagement.route('/projecttype/<int:id>')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID des Projecttype-Objekts')
class ProjectTypeOperations(Resource):
    @projectmanagement.marshal_with(projecttype)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Projecttype-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        pro = adm.get_all_projecttype_by_id(id)
        return pro

    @secured
    def delete(self, id):
        """Löschen eines bestimmten projecttype-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        proj = adm.get_all_projecttype_by_id(id)
        adm.delete_projecttype(proj)
        return '', 200

    @projectmanagement.marshal_with(projecttype)
    @projectmanagement.expect(projecttype, validate=True)
    @secured
    def put(self, id):
        """Update eines bestimmten Projecttype-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = ProjectAdministration()
        proje = ProjectType.from_dict(api.payload)

        if proje is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Customer-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            proje.set_id(id)
            adm.save_projecttype(proje)
            return '', 200
        else:
            return '', 500



"""ProjectPrpjectartOperationen"""


@projectmanagement.route('/project/<int:id>projecttype')
@projectmanagement.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanagement.param('id', 'Die ID der Project-Objekts')
class ParticipationStudentOperations(Resource):
    @projectmanagement.marshal_with(projecttype)
    @secured
    def get(self, id):
        """Auslesen aller Project-Objekte eines bestimmten Projecttypes .

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        projectt = adm.get_all_projecttype_by_id(id)  # Suche nach projecttype mit vorgegebener id

        if projectt is not None:
            project_list= adm.get_project_for_projecttype(projectt)
            return project_list

        else:
            return "projecttype not found",500


    @projectmanagement.marshal_with(projecttype, code=201)
    @secured
    def post(self, id):
        """Anlegen eines Project rür einen gegebenene Projecttyp.

        Das neu angelegte Project  wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Student existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Customer gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        projectty = adm.get_projecttype_for_project(id)

        if projectty is not None:
            # Jetzt erst macht es Sinn, dem Project einen neuen Projecttype anzulegen und dieses zurückzugeben.
            result = adm.create_project_for_projecttype(projectty)
            return result
        else:
            return "projecttype unknown", 500












if __name__ == '__main__':
    app.run(debug=True)
















