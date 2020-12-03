from server.bo.Participation import Participation
from server.db.Mapper import Mapper


class ParticipationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Participation.

        :result Eine Sammlung mit Participation-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from participations")
        tuples = cursor.fetchall()

        for (id, project,student) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_project(project)
            participation.set_student(student)
            participation.append(participation)

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_id(self, id):
        """Suchen einer Teilnahme mit vorgegebener ID Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Participation-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, student, project FROM participations WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, project, student) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_projet(project)
            participation.set_student(student)


        result = participation

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, participation):
        """Einfügen eines Participation-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param participation das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM participations ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            participation.set_id(maxid[0] + 1)

        command = "INSERT INTO participations (id,project,student) VALUES (%s,%s,%s)"
        data = (participation.get_id(), participation.get_student(),participation.get_project())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return participation

    def update(self, participation):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param participation das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE participations " + "SET project=%s, student=%s WHERE id=%s"
        data = (participation.get_id(), participation.get_project(),participation.get_student())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, participation):
        """Löschen der Daten eines Participation-Objekts aus der Datenbank.

        :param participation das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM participations WHERE id={}".format(participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_participation_by_student(self, id):

        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit Participation-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält.
            """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, student, project FROM participations WHERE student.id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, project, student) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_project(project)
            participation.set_student(student)
            result = participation
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_participation_by_project(self,id):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse.

        :param id E-Mail-Adresse der zugehörigen Benutzer.
        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
        mit der gewünschten E-Mail-Adresse enthält. """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, student, project FROM participations WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, project, student) = tuples[0]
            participation = Participation()
            participation.set_id(id)
            participation.set_project(project)
            participation.set_student(student)
            result = participation
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ParticipationMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)








