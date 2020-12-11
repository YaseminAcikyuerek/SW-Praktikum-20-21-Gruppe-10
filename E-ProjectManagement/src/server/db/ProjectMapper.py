from server.bo.Project import Project
from server.db.Mapper import Mapper


class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from project")
        tuples = cursor.fetchall()

        for (id, name, owner, module_id, language, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status, semester_id, projecttype_id) in tuples:

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module_id)
            project.set_language(language)
            project.set_projecttype(projecttype_id)
            project.set_time(semester_id)
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


    def find_by_key(self, key):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE key={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id,name, owner, module_id, language, project_typ, time, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module_id)
            project.set_language(language)
            project.set_project_typ(project_typ)
            project.set_time(time)
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

        result = project

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project.set_id(maxid[0] + 1)

        command = "INSERT INTO projects (id,name, owner, module, language, project_typ, time, capacity," \
                  "external_partner_list, short_description, flag, bd_before_lecture_period," \
                  "bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period," \
                  "special_room, room, status) VALUES (%s,%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s," \
                  "%s, %s)"

        data = (project.get_id(), project.get_owner(), project.get_name(), project.get_owner(),
                project.get_status())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project

    def update(self, project):

        cursor = self._cnx.cursor()

        command = "UPDATE projects " + "SET owner=%s, name=%s, module=%s, status=%s," \
                                       "project_typ=%s, time=%s, capacity=%s, " \
                                       "external_partner_list=%s, short_description=%s," \
                                       "flag=%s, bd_before_lecture_period=%s, bd_during_lecture_period=%s" \
                                       "bd_during_exam_period=%s, preferred_bd_during_lecture_period=%s " \
                                       "special_room=%s, room=%s, language=%s WHERE id=%s"
        data = (project.get_owner(), project.get_id(), project.get_name(), project.get_status(),
                project.get_module(), project.get_project_typ(), project.get_time(), project.get_capacity(),
                project.get_external_partner_list(), project.get_short_description(), project.get_flag(),
                project.get_bd_before_lecture_period(), project.get_bd_during_lecture_period(),
                project.get_bd_during_exam_period(), project.get_preferred_bd_during_lecture_period(),
                project.get_special_room(), project.get_room(), project.get_language())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, project):

        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_project_by_name(self, name):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE project.name={}".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, owner, module, language, project_typ, time, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             status, room, special_room) = tuples[0]

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module)
            project.set_language(language)
            project.set_project_typ(project_typ)
            project.set_time(time)
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


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_project_by_owner(self, owner):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE project.owner={}".format(owner)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, owner, module, language, project_typ, time, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             status, room, special_room) = tuples[0]

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_module(module)
            project.set_language(language)
            project.set_project_typ(project_typ)
            project.set_time(time)
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


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

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





