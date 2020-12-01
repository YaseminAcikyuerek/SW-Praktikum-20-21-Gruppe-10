from server.bo.RatingBO import RatingBO
from server.db.Mapper import Mapper


class RatingMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, owner from ratings")
        tuples = cursor.fetchall()

        for (id, owner) in tuples:
            rating = RatingBO()
            rating.set_id(id)
            rating.set_owner(owner)
            result.append(rating)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, key):
        """Suchen eines Kontos mit vorgegebener Kontonummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Konto-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, owner FROM ratings WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, owner) = tuples[0]
            rating = RatingBO()
            rating.set_id(id)
            rating.set_owner(owner)

        result = rating

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, rating):
        """Einfügen eines Account-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ratings ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            rating.set_id(maxid[0] + 1)

        command = "INSERT INTO accounts (id, owner) VALUES (%s,%s)"
        data = (rating.get_id(), rating.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return rating

    def update(self, rating):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE rating " + "SET owner=%s WHERE id=%s"
        data = (rating.get_owner(), rating.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, rating):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM ratings WHERE id={}".format(rating.get_id())
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


