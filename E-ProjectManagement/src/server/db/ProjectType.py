from server.bo import ProjectType
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
        cursor.execute("SELECT * from projecttypes")
        tuples = cursor.fetchall()

        for (id,sws, ects) in tuples:
            projecttype = ProjectType()
            projecttype.set_id(id)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            result.append(projecttype)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Projekttypen mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Projekttyp-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id,sws,ects FROM projectTypes WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id,sws,ects) = tuples[0]
            projecttype = ProjectType()
            projecttype.set_id(id)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)

        result = projecttype

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, projecttype):
        """Einfügen eines ProjektType-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param Projekttype das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projectTypes ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projecttype.set_id(maxid[0] + 1)

        command = "INSERT INTO projectTypes (sws, ects) VALUES (%s,%s)"
        data = (projecttype.get_id(), projecttype.get_sws(), projecttype.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return projecttype

    def update(self, projecttype):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE projectTypes " + "SET sws=%s, ects=%s WHERE id=%s"
        data = (projecttype.get_sws(), projecttype.get_id(), projecttype.get_ects())
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



