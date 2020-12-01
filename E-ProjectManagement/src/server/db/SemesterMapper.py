from server.bo.SemesterBO import Semester
from server.db.Mapper import Mapper



class SemesterMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Semester.

        :return Eine Sammlung mit Semester-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, start, end from semesters")
        tuples = cursor.fetchall()

        for (id, start, end) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_start(start)
            semester.set_end(end)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        """Suchen eines Semesters mit vorgegebener Semesternummer . Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Semester-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, start, end FROM semesters WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, owner) = tuples[0]
            semester = SemesterBO()
            semester.set_id(id)
            semester.set_start(start)
            semester.set_end(end)

        result = semester

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, semester):
        """Einfügen eines Semester-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param Semester das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM semesters ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            semester.set_id(maxid[0] + 1)

        command = "INSERT INTO semester (id, start, end) VALUES (%s,%s)"
        data = (semester.get_id(), semester.get_start(), semester.get_end())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return semester

    def update(self, semester):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param semester das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE semesters " + "SET owner=%s WHERE id=%s"
        data = (semester.get_start(), semester.get_end(), semester.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, semester):
        """Löschen der Daten eines Semester-Objekts aus der Datenbank.

        :param Semester das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM semesters WHERE id={}".format(account.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with SemesterMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)



