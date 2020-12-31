from server.bo.Rating import Rating
from server.db.Mapper import Mapper


class RatingMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, grade from rating")
        tuples = cursor.fetchall()

        for (id, grade) in tuples:
            rating = Rating()
            rating.set_id(id)
            rating.set_grade(grade)
            result.append(rating)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_role_id(self, role_id):
        """Ausleseen einer role_id einer Person.

        :param owner_id Schlüssel des zugehörigen Person.
        :return Eine Sammlung mit Rating-Objekten, die sämtliche Role_IDs der
                betreffenden Person  repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, role_id FROM rating WHERE role_id={} ORDER BY id".format(role_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, role_id) in tuples:
            rating = Rating()
            rating.set_id(id)
            rating.set_role_id(role_id)
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
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, grade FROM rating WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, grade) = tuples[0]
            rating = Rating()
            rating.set_id(id)
            rating.set_grade(grade)

        result = rating

        self._cnx.commit()
        cursor.close()

        return result



    def insert(self, rating):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM rating ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            rating.set_id(maxid[0] + 1)

        command = "INSERT INTO rating (id, grade) VALUES (%s,%s)"
        data = (rating.get_id(), rating.get_grade())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return rating

    def update(self, rating):

        cursor = self._cnx.cursor()

        command = "UPDATE rating " + "SET grade=%s WHERE id=%s"
        data = (rating.get_grade(), rating.get_id())
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
    with RatingMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)


