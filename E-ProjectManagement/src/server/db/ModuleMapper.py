from server.bo.ModuleBO import Module
from server.db.Mapper import Mapper


class ModuleMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Module.

        :return Eine Sammlung mit Modul-Objekten,

        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT *  from modules")
        tuples = cursor.fetchall()

        for (id, name, edv_nr) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_nr(edv_nr)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result



    def find_by_key(self, id):
        """Suchen eines moduls mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return modul-Objekt, das dem übergebenen Schlüssel entspricht, None bei
        nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, edv_nr FROM modules WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, edv_nr) = tuples[0]
            module = Module()
            module.set_id(id)
            module.set_edv_nr(edv_nr)
            module.set_name(name)

        result = module

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, module):
        """Einfügen eines module-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param module das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM modules ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            module.set_id(maxid[0] + 1)

        command = "INSERT INTO modules (id, name, edv_nr) VALUES (%s,%s,%s)"
        data = (module.get_id(), module.get_name(), module.get_edv_nr())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return module

    def update(self, module):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param module das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE modules " + "SET name=%s, edv_nr=%s WHERE id=%s"
        data = (module.get_name(), module.get_id(), module.get_edv_nr())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, module):
        """Löschen der Daten eines module-Objekts aus der Datenbank.

        :param module das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM modules WHERE id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_edv_nr(self, edv_nr):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, edv_nr,  FROM users WHERE name LIKE '{}' ORDER BY edv_nr".format(edv_nr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_nr ) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_nr(edv_nr)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):
        """Auslesen aller Benutzer anhand des Benutzernamens.
        :param name Name der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                mit dem gewünschten Namen enthält."""

        result=[]
        cursor = self._cnx.cursor()
        command = "SELECT id, name, edv_nr,  FROM users WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_nr) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_nr(edv_nr)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result



"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ModuleMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)
