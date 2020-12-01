from server.bo.ProjectBO import Project
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

        for (id,name, owner, status) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(id)
            project.set_owner(owner)
            project.set_status(status)

            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        """Suchen eines Projekts mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return projekt-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        acommnd = "SELECT id, name, owner, status FROM project WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, owner, status) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_owner(owner)
            project.set_status(status)

        result = project

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project):
        """Einfügen eines projekt-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projects ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project.set_id(maxid[0] + 1)

        command = "INSERT INTO projects (id, name,owner, status) VALUES (%s,%s,%s,%s)"
        data = (project.get_id(), project.get_owner(), project.get_name(), project.get_status())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param project das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE projects " + "SET owner=%s WHERE id=%s"
        data = (project.get_owner(), project.get_id(), project.get_name(), project.get_status())
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


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProjectMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)





