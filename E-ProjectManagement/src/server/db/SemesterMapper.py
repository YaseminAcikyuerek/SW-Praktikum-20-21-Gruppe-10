from server.bo.Semester import Semester
from server.db.Mapper import Mapper


class SemesterMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, start, end from semester")
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



    def find_by_id(self, id): #suche semester nach id

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, start, end FROM semester WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, start, end) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_start(start)
            semester.set_end(end)

        result = semester

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, semester):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM semester ")
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

        cursor = self._cnx.cursor()

        command = "UPDATE semester " + "SET start=%s, end=%s WHERE id=%s"
        data = (semester.get_start(), semester.get_end(), semester.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, semester):

        cursor = self._cnx.cursor()

        command = "DELETE FROM semester WHERE id={}".format(semester.get_id())
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



