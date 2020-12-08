from server.db.Mapper import Mapper
from server.bo.Role import Role


class RoleMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekttypen.

        :return Eine Sammlung mit Projekttyp-Objekten, die sämtliche Projekte
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from role")
        tuples = cursor.fetchall()

        for (id,name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_name(name)
            result.append(role)

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
        command = "SELECT id,name FROM projectTypes WHERE key={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name) = tuples[0]
            role = Role()
            role.set_id(id)
            role.set_name(name)

        result = role

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, role):
        """Einfügen eines ProjektType-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param Projekttype das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM role ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            role.set_id(maxid[0] + 1)

        command = "INSERT INTO role (name) VALUES (%s)"
        data = (role.get_id(), role.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return role

    def update(self, role):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE role " + "SET name=%s"
        data = (role.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, role):
        """Löschen der Daten eines ProjektType-Objekts aus der Datenbank.

        :param ProjectType das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()




"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with RoleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)