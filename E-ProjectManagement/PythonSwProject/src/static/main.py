# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück

from server.ProjectAdministration import ProjectAdministrations
from server.bo.Person import Person
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Module import Module
from server.bo.Rating import Rating
from server.bo.ProjectType import ProjectType
from server.bo.Semester import Semester
from server.bo.ProjectType import ProjectType
from server.bo.Role import Role
from server.bo.DEA import DEA
from server.bo.Student import Student


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
CORS(app, resources=r'/bank/*')

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""
api = Api(app, version='1.0', title='BankBeispiel API',
    description='Eine rudimentäre Demo-API für doppelte Buchführung in Banken.')

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Bank-relevanten Operationen unter dem Präfix /bank zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /bank/v1, /bank/v2 usw."""
banking = api.namespace('bank', description='Funktionen des BankBeispiels')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

participation = api.inherit('Participation', bo, {

    'participation_id': fields.Integer(attribute='_participation_id', description='ID einer Participation')
})

rating = api.inherit('Rating', bo, {
    'name': fields.String(attribute='_name', description='Name des Ratings'),
    'evaluator': fields.String(attribute='_email', description='Evaluierer'),
    'to_be_assessed': fields.String(attribute='to_be_assessed', description='benotet'),
    'passed': fields.String(attribute='_user_id', description='bestanden'),
    'grade': fields.String(attribute='_user_id', description='Note')
})

status = api.inherit('DEA', bo, {
    'status': fields.Array(attribute='"new", "in process","declined","approved","rating completed"', description=''),
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Name eines BusinessObjects'),
})

module = api.inherit('Module', nbo, {
    'edv_nr': fields.String(attribute='_edv_nr', description='edv_nr eines modules'),
    'module_id': fields.Integer(attribute='_module_id',description='ID eines modules'),
})

semester = api.inherit('Semester', nbo, {
    'start': fields.String(attribute='_start', description='Start eines semesters'),
    'end': fields.String(attribute='_end',description='Ende eines Semesters'),
    'semester_id': fields.Integer(attribute='_semester_id',description='ID eines semesters'),

})

project = api.inherit('Project', nbo, {
    'status': fields.String(attribute='_status', description='Status eines Projekts'),
    'capacity': fields.String(attribute='_capacity',description='Kapazität eines Semesters'),
    'project_id': fields.Integer(attribute='_project_id',description='ID eines projckts'),
    'flag': fields.String(attribute='_flag', description='Flag eines Projekts'),
    'external_partner_list': fields.String(attribute='_external_partner_list', description='Externe Partnerliste eines Projekts'),
    'short_discription': fields.String(attribute='_short_discription', description='Kurze Beschreibung eines Projekts'),
    'bd_before_lecture_period': fields.String(attribute='_bd_before_lecture_period', description='Blocktage vor Vorleungszeit'),
    'bd_during_lecture_period': fields.String(attribute='_bd_during_lecture_period', description='Blocktage während Vorleungszeit'),
    'bd_during_exam_period': fields.String(attribute='_bd_during_exam_period', description='Während vor Pruefungszeitraum'),
    'room': fields.String(attribute='_room', description='Raum eines Projekts'),
    'special_room': fields.String(attribute='_special_room', description='special_room'),
    'language': fields.String(attribute='_language', description='Sprache'),
    'preferred_bd_during_lecture_period': fields.String(attribute='_preferred_bd_during_lecture_period', description='Präfferierter Raum'),
    'time': fields.Integer(attribute='_time', description='Zeit'),
    'module': fields.NoneType(attribute='_module', description='Modul'),
    'owner': fields.NoneType(attribute='_owner', description='Owner des Projekts'),
    'projecttype': fields.NoneType(attribute='_projecttype', description='Projektyp'),

})

projecttype = api.inherit('ProjectType', nbo, {
    'sws': fields.String(attribute='_sws', description=''),
    'ects': fields.String(attribute='_ects',description=''),
    'projecttype_id': fields.Integer(attribute='_projecttype_id',description=''),


})

person = api.inherit('Person', nbo, {
    'role': fields.Object(attribute='_role', description=''),
})

student = api.inherit('Student', person, {
    'matriculation_nr': fields.Integer(attribute='_matriculation_nr', description=''),
    'course_abbr': fields.String(attribute='course_abbr', description=''),

})
role = api.model('Role', nbo, {
    'role_id': fields.Integer(attribute='role_id', description=''),


})
































