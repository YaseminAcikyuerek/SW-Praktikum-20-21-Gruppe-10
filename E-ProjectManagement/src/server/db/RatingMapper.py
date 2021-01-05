from server.bo.Rating import Rating
from server.db.Mapper import Mapper


class RatingMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, project,evaluator, to_be_assessed, grade, passed  from rating")
        tuples = cursor.fetchall()

        for (id, project, evaluator, to_be_assessed, grade, passed) in tuples:
            rating = Rating()
            rating.set_id(id)
            rating.set_project(project)
            rating.set_evaluator(evaluator)
            rating.set_to_be_assessed(to_be_assessed)
            rating.set_grade(grade)
            rating.set_passed(passed)
            result.append(rating)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_role_id(self, role):
        """Ausleseen einer role_id einer Person.

        :param owner_id Schlüssel des zugehörigen Person.
        :return Eine Sammlung mit Rating-Objekten, die sämtliche Role_IDs der
                betreffenden Person  repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, role FROM rating WHERE role={} ORDER BY id".format(role)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, role_id) in tuples:
            rating = Rating()
            rating.set_id(id)
            rating.set_role(role_id)
            result.append(rating)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Ratings mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return ID Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, project, evaluator, to_be_assessed, grade, passed FROM rating WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, project, evaluator, to_be_assessed, grade, passed) = tuples[0]
            rating = Rating()
            rating.set_id(id)
            rating.set_project(project)
            rating.set_evaluator(evaluator)
            rating.set_to_be_assessed(to_be_assessed)
            rating.set_grade(grade)
            rating.set_passed(passed)
            result.append(rating)

        self._cnx.commit()
        cursor.close()

        return result



    def insert(self, rating):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM rating ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            rating.set_id(maxid[0] + 1)

        command = "INSERT INTO rating (id, project, evaluator, to_be_assessed, grade, passed) VALUES (%s,%s,%s,%s,%s," \
                  "%s) "
        data = (rating.get_id(),rating.get_project(),rating.get_evaluator(),rating.get_to_be_assessed(),rating.get_grade(),rating.get_passed())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return rating

    def update(self, rating):

        cursor = self._cnx.cursor()

        command = "UPDATE rating SET project=%s, evaluator=%s,to_be_assessed=%s,grade=%s,passed=%s WHERE id=%s "
        data = (rating.get_project(),rating.get_evaluator(),rating.get_to_be_assessed(),rating.get_grade(),rating.get_passed(),rating.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, rating):

        cursor = self._cnx.cursor()

        command = "DELETE FROM rating WHERE id={}".format(rating.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    r = Rating()
    r.set_id(1414)
    r.set_project(3)
    r.set_evaluator(7)
    r.set_to_be_assessed(8)
    r.set_grade(6.0)
    r.set_passed(1)

    with RatingMapper() as mapper:
        result = mapper.update(r)









