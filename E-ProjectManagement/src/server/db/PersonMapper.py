from server.bo.Person import Person
from server.db.Mapper import Mapper


class PersonMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, creation_time, name, role, email, google_user_id FROM person")
        tuples = cursor.fetchall()

        for (id, creation_time, name, role, email, google_user_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_creation_time(creation_time)
            person.set_name(name)
            person.set_role(role)
            person.set_email(email)
            person.set_google_user_id(google_user_id)
            result.append(person)


        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):

        """Suchen einer Person mit vorgegebener id. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Konto-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, creation_time, name, role, email, google_user_id FROM person WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, creation_time, name, role, email, google_user_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_creation_time(creation_time)
            person.set_name(name)
            person.set_role(role)
            person.set_email(email)
            person.set_google_user_id(google_user_id )

        result = person

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0] + 1)

        command = "INSERT INTO person (id,creation_time, name, role,email) VALUES (%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_creation_time(), person.get_name(), person.get_role(), person.get_email())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):

        cursor = self._cnx.cursor()

        command = "UPDATE person SET creation_time=%s, name=%s,role=%s, email=%s, google_user_id=%s WHERE id=%s"
        data = (person.get_creation_time(), person.get_name(), person.get_role(), person.get_email(), person.get_google_user_id(), person.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param person das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM person WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_person_by_role(self, role):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM person WHERE role={}".format(role)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_time, name, role) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_creation_time(creation_time)
            person.set_name(name)
            person.set_role(role)

            result = person

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM person WHERE name LIKE '%{}%'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, creation_time, name, role) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_creation_time(creation_time)
            person.set_name(name)
            person.set_role(role)
            result = person

        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
"""if (__name__ == "__main__"):
    with PersonMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)




    if (__name__ == "__main__"):
    r = PersonMapper()
    r.set_id(0)
    r.set_name("Harald")
    r.set_role(1)

    with PersonMapper() as mapper:
        result = mapper.update(r)

"""



