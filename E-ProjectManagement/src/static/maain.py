from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.ProjectAdministration import ProjectAdministration
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Person import Person
from server.bo.Project import Project
from server.bo.ProjectType import ProjectType
from server.bo.Rating import Rating
from server.bo.Role import Role
from server.bo.Semester import Semester
from server.bo.Status import Status

# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
from SecurityDecorator import secured

"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)

"""
Alle Ressourcen mit dem Präfix /bank für **Cross-Origin Resource Sharing** (CORS) freigeben.
Diese eine Zeile setzt die Installation des Package flask-cors voraus. 

Sofern Frontend und Backend auf getrennte Domains/Rechnern deployed würden, wäre sogar eine Formulierung
wie etwa diese erforderlich:
CORS(app, resources={r"/bank/*": {"origins": "*"}})
Allerdings würde dies dann eine Missbrauch Tür und Tor öffnen, so dass es ratsamer wäre, nicht alle
"origins" zuzulassen, sondern diese explizit zu nennen. Weitere Infos siehe Doku zum Package flask-cors.
"""
CORS(app, resources=r'/project/*')

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""
api = Api(app, version='1.0', title='ProjectManagement API',
    description='Eine Demo-API für ein Projektmanagement-System an einer Hochschule.')

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Projekt-relevanten Operationen unter dem Präfix /bank zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /bank/v1, /bank/v2 usw."""
projectmanagement = api.namespace('project', description='Funktionen des Projektmanagements')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
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
    'role': fields.String(attribute='_role', description='unique ID der Rolle')
    'user_id': fields.Integer(attribute='_user_id', description='externe ID die von Google übergeben wird')
})

project = api.inherit('Project', bo, {
    'name': fields.String(attribute='_name', description='Name des Projekts'),
    'owner': fields.Integer(attribute='_owner',description='unique ID des Projektbesitzers'),
    'module': fields.Integer(attribute='_module',description='unique ID des Projektmoduls'),
    'language': fields.String(attribute='_language',description='Sprache des Projekts'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Kapazität des Projekts'),
    'external_partner_list': fields.List(attribute='_external_partner_list', description='Die externen Partner des Projektes'),
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
    'to_be_assessed': fields.Integer(attribute='_to_be_assessed', description='unique ID des zu beurteilenden Studenten')
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
        person = adm.get_all_person()
        return person

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
@projectmanagement.param('id', 'Die ID des Person-Objekts')
class PersonOperations(Resource):
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
        adm.delete_person(pers)
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
            adm.save_person(p)
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
class ProjectListOperations(Resource):
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
    @projectmanagement.marshal_with(project)
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
        pro.delete_project(pro)
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

