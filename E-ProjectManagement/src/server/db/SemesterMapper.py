from server.bo.Semester import Semester
from server.db.Mapper import Mapper


class SemesterMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, creation_time, start, end, name FROM semester")
        tuples = cursor.fetchall()

        for (id, creation_time, start, end, name) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_creation_time(creation_time)
            semester.set_name(name)
            semester.set_start(start)
            semester.set_end(end)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id): #suche semester nach id

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_time, name, start, end  FROM semester WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, creation_time, name, start, end) = tuples[0]
            semester = Semester()
            semester.set_id(id)
            semester.set_creation_time(creation_time)
            semester.set_name(name)
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

        command = "INSERT INTO semester (id,name,start,end) VALUES (%s,%s,%s,%s)"
        data = (semester.get_id(), semester.get_name(), semester.get_start(), semester.get_end())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return semester

    def update(self, semester):

        cursor = self._cnx.cursor()

        command = "UPDATE semester SET creation_time=%s, name=%s, start=%s, end=%s  WHERE id=%s"
        data = (semester.get_creation_time(),semester.get_name(),semester.get_start(), semester.get_end(),semester.get_id())
        cursor.execute(command,data)

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
        result = mapper.delete(2020)
        for p in result:
            print(p)

if (__name__ == "__main__"):
    s = Semester()
    s.set_id(2023)
    s.set_creation_time(2023-12-10)
    s.set_name("SSSasfsfaf")
    s.set_start(2023-10-10)
    s.set_end(2023-10-10)

    with SemesterMapper() as mapper:
        result = mapper.update(s)






