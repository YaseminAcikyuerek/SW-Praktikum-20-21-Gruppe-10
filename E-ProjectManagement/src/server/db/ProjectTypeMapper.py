from server.bo.ProjectType import ProjectType
from server.db.Mapper import Mapper


class ProjectTypeMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from project_type")
        tuples = cursor.fetchall()

        for (id, creation_time, name,sws, ects) in tuples:
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_time(creation_time)
            project_type.set_name(name)
            project_type.set_sws(sws)
            project_type.set_ects(ects)

            result.append(project_type)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT * FROM project_type WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, creation_time, name, sws,ects) = tuples[0]
            project_type = ProjectType()
            project_type.set_id(id)
            project_type.set_creation_time(creation_time)
            project_type.set_name(name)
            project_type.set_sws(sws)
            project_type.set_ects(ects)



        result = project_type

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project_type):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project_type ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            project_type.set_id(maxid[0] + 1)

        command = "INSERT INTO project_type (id, creation_time, name,sws,ects) VALUES (%s,%s,%s,%s, %s)"
        data = (project_type.get_id(), project_type.get_creation_time(), project_type.get_name(), project_type.get_sws(), project_type.get_ects())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return project_type

    def update(self, project_type):

        cursor = self._cnx.cursor()

        command = "UPDATE project_type SET sws=%s, ects=%s, name=%s WHERE id=%s"
        data = (project_type.get_name(),project_type.get_sws(), project_type.get_ects(),  project_type.get_id(), project_type.get_creation_time())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, project_type):

        cursor = self._cnx.cursor()

        command = "DELETE FROM project_type WHERE id={}".format(project_type.get_id())
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



