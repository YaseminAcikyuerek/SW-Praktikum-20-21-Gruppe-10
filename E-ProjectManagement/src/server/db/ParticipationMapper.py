from server.bo.ParticipationBO import ParticipationBO
from server.db.Mapper import Mapper


class ParticipationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Participation.

        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name from participation")
        tuples = cursor.fetchall()

        for (id, owner) in tuples:
            participation = ParticipationBO()
            participation.set_id(id)
            participation.set_owner(owner)
            participation.append(participation)

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
        acommnd = "SELECT id, owner FROM participations WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, owner) = tuples[0]
            participation = ParticipationBO()
            participation.set_id(id)
            participation.set_owner(owner)

        result = participation

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, participation):
        """Einfügen eines Account-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM partcipations ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            module.set_id(maxid[0] + 1)

        command = "INSERT INTO participations (id, owner) VALUES (%s,%s)"
        data = (participation.get_id(), participation.get_owner())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation

    def update(self, participation):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE participations " + "SET owner=%s WHERE id=%s"
        data = (participation.get_owner(), participation.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, participation):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM participations WHERE id={}".format(participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ParticipationMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)








