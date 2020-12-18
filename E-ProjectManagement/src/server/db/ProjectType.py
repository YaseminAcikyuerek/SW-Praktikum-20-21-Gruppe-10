from server.bo.ProjectType import ProjectType
from server.db.Mapper import Mapper


class ProjectTypeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, sws, ects from projecttype")
        tuples = cursor.fetchall()

        for (id,sws, ects) in tuples:
            projecttype = ProjectType()
            projecttype.set_id(id)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)
            result.append(projecttype)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id,sws,ects FROM projectTypes WHERE key={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id,sws,ects) = tuples[0]
            projecttype = ProjectType()
            projecttype.set_id(id)
            projecttype.set_sws(sws)
            projecttype.set_ects(ects)

        result = projecttype

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, projectType):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projectTypes ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            projectType.set_id(maxid[0] + 1)

        command = "INSERT INTO projectTypes (sws, ects) VALUES (%s,%s)"
        data = (projectType.get_id(), projectType.get_sws(), projectType.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return projectType

    def update(self, projectType):

        cursor = self._cnx.cursor()

        command = "UPDATE projectTypes " + "SET sws=%s, ects=%s WHERE id=%s"
        data = (projectType.get_sws(), projectType.get_id(), projectType.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, projectType):

        cursor = self._cnx.cursor()

        command = "DELETE FROM projectTypes WHERE id={}".format(projectType.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()




"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProjectTypeMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)



