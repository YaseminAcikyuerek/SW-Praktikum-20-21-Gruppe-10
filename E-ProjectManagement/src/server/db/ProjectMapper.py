from server.bo.Project import Project
from server.db.Mapper import Mapper

#test

class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from project")
        tuples = cursor.fetchall()

        for (id, semester, module, short_description, external_partner_list, capacity,
             bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
             preferred_bd_during_lecture_period, language, room, special_room, flag, name,
             status, project_type, owner) in tuples:

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module)
            project.set_language(language)
            project.set_project_type(project_type)
            project.set_semester(semester)
            project.set_capacity(capacity)
            project.set_external_partner_list(external_partner_list)
            project.set_short_description(short_description)
            project.set_flag(flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_during_lecture_period(bd_during_lecture_period)
            project.set_bd_during_exam_period(bd_during_exam_period)
            project.set_preferred_bd_during_lecture_period(preferred_bd_during_lecture_period)
            project.set_status(status)
            project.set_room(room)
            project.set_special_room(special_room)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, semester, module, short_description, external_partner_list, capacity,
             bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
             preferred_bd_during_lecture_period, language, room, special_room, flag, name,
             status, project_type, owner) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module)
            project.set_language(language)
            project.set_project_type(project_type)
            project.set_semester(semester)
            project.set_capacity(capacity)
            project.set_external_partner_list(external_partner_list)
            project.set_short_description(short_description)
            project.set_flag(flag)
            project.set_bd_before_lecture_period(bd_before_lecture_period)
            project.set_bd_during_lecture_period(bd_during_lecture_period)
            project.set_bd_during_exam_period(bd_during_exam_period)
            project.set_preferred_bd_during_lecture_period(preferred_bd_during_lecture_period)
            project.set_status(status)
            project.set_room(room)
            project.set_special_room(special_room)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project.set_id(maxid[0] + 1)

        command = "INSERT INTO project (id, semester, module, short_description, external_partner_list, capacity," \
                  "bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period," \
                  "preferred_bd_during_lecture_period, language, room, special_room, flag, name," \
                  "status, project_type, owner) VALUES (%s,%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s," \
                  "%s, %s)"

        data = (project.get_id(), project.get_semester(), project.get_module(), project.get_short_description(),
                project.get_external_partner_list(), project.get_capacity(), project.get_bd_during_exam_period(),
                project.get_bd_before_lecture_period(), project.get_bd_during_lecture_period(),
                project.get_preferred_bd_during_lecture_period(), project.get_language(), project.get_room(),
                project.get_special_room(), project.get_flag(), project.get_name(), project.get_status(),
                project.get_project_type(), project.get_owner())

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return project

    def update(self, project):

        cursor = self._cnx.cursor()

        command = "UPDATE project SET owner=%s, name=%s, module=%s, status=%s," \
                  "project_type=%s, semester=%s, capacity=%s,external_partner_list=%s, short_description=%s," \
                  "flag=%s, bd_before_lecture_period=%s, bd_during_lecture_period=%s," \
                  "bd_during_exam_period=%s, preferred_bd_during_lecture_period=%s,special_room=%s, room=%s, " \
                  "language=%s WHERE id=%s"
        data = (project.get_id(), project.get_semester(), project.get_module(), project.get_short_description(),
                project.get_external_partner_list(), project.get_capacity(), project.get_bd_during_exam_period(),
                project.get_bd_before_lecture_period(), project.get_bd_during_lecture_period(),
                project.get_preferred_bd_during_lecture_period(), project.get_language(), project.get_room(),
                project.get_special_room(), project.get_flag(), project.get_name(), project.get_status(),
                project.get_project_type(), project.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, project):

        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_name(self, name):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE name LIKE '%{}%'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, semester, module, short_description, external_partner_list, capacity,
             bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
             preferred_bd_during_lecture_period, language, room, special_room, flag, name,
             status, project_type, owner) = tuples[0]

            project = Project()
            project.set_id(id)
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
            result.append(project)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_project_by_owner(self, owner):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE owner".format(owner)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, semester, module, short_description, external_partner_list, capacity,
             bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
             preferred_bd_during_lecture_period, language, room, special_room, flag, name,
             status, project_type, owner) = tuples[0]

            project = Project()
            project.set_id(id)
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
            result.append(project)


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_project_by_module(self, module):

        result = []

        cursor = self._cnx.cursor()
        command = " SELECT * FROM project WHERE module={}".format(module)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, semester, module, short_description, external_partner_list, capacity,
             bd_during_exam_period, bd_before_lecture_period, bd_during_lecture_period,
             preferred_bd_during_lecture_period, language, room, special_room, flag, name,
             status, project_type, owner) in tuples:

            project = Project()
            project.set_id(id)
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
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProjectMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)





