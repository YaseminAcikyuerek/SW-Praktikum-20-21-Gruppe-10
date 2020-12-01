from server.bo.ProjectTypeBO import ProjectTypeBO
from server.db.Mapper import Mapper



class ProjectTypeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekttypen.

        :return Eine Sammlung mit Projekttyp-Objekten, die sämtliche Projekte
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from projectTypes")
        tuples = cursor.fetchall()

        for (id,sws, ects) in tuples:
            projectType = ProjectType()
            projectType.set_id(id)
            projectType.set_sws(sws)
            projectType.set_ects(ects)
            result.append(projectType)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        """Suchen eines Projekttypen mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Projekttyp-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        acommnd = "SELECT id,sws,ects FROM projectTypes WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id,sws,ects) = tuples[0]
            projectType = ProjectType()
            projectType.set_id(id)
            projectType.set_sws(sws)
            projectType.set_ects(ects)

        result = projectType

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self,sws,ects):
        """Einfügen eines ProjektType-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param ProjektType das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projectTypes ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projectType.set_id(maxid[0] + 1)

        command = "INSERT INTO projectTypes (id, owner) VALUES (%s,%s)"
        data = (projectType.get_id(), projectType.get_sws(), projectType.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return projectType

    def update(self, sws, ects):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE projectTypes " + "SET sws=%s WHERE id=%s" "UPDATE projectTypes"+"SET ects=%s WHERE id=%s"
        data = (projectType.get_sws(), projectType.get_id(), projectType.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projectType):
        """Löschen der Daten eines ProjektType-Objekts aus der Datenbank.

        :param ProjectType das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM projectTypes WHERE id={}".format(projectType.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()






"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProjectTypeMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)



