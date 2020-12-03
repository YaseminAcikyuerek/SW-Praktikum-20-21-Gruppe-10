from server.bo.Project import Project
from server.db.Mapper import Mapper


class ProjectMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller projekte.

        :return Eine Sammlung mit project-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from projects")
        tuples = cursor.fetchall()

        for (id,name, owner, module, language, project_typ, time, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status) in tuples:

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

            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):
        """Suchen eines Projekts mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return projekt-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id,name, owner, module, language, project_typ, time, capacity,
             external_partner_list, short_description, flag, bd_before_lecture_period,
             bd_during_lecture_period, bd_during_exam_period, preferred_bd_during_lecture_period,
             special_room, room, status) = tuples[0]
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

        result = project

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project):
        """Einfügen eines projekt-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param project das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projects ")
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
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param project das Objekt, das in die DB geschrieben werden soll
        """
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
        """Löschen der Daten eines project-Objekts aus der Datenbank.

        :param project das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM projects WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_project_by_name(self, name):

        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param name E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit Participation-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält.
            """
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

        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param name E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit Participation-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält.
            """
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





