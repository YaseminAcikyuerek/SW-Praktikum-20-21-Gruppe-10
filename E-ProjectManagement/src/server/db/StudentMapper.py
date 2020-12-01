from server.bo.StudentBO import StudentBO
from server.db.Mapper import Mapper


class StudentMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Studenten.

        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from students")
        tuples = cursor.fetchall()

        for (id, name, matriculation_nr,course_abbr)in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        """Suchen eines Students mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return student-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_nr, course_abbr FROM students WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, matriculation_nr, course_abbr) =  tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)


        result = student

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Einfügen eines student-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM students ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            student.set_id(maxid[0] + 1)

        command = "INSERT INTO students (id,name, matriculation_nr, course_abbr) VALUES (%s,%s,%s,%s)"
        data = (student.get_id(), student.get_owner(),student.get_matriculation_nr(),student.get_course_abbr())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return student

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param student das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE students " + "SET owner=%s WHERE id=%s"
        data = (student.get_owner(), student.get_id(), student.get_matriculation_nr(), student.get_course_abbr())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, student):
        """Löschen der Daten eines student-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM atudents WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)














