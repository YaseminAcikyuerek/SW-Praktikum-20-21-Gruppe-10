from server.db.Mapper import Mapper
from server.bo.Role import Role


class RoleMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from role")
        tuples = cursor.fetchall()

        for (id, role_name) in tuples:
            role = Role()
            role.set_id(id)
            role.set_role_name(role_name)
            result.append(role)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id,role_name FROM role WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, role_name) = tuples[0]
            role = Role()
            role.set_id(id)
            role.set_role_name(role_name)

        result = role

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, role):

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

        cursor = self._cnx.cursor()

        command = "UPDATE role " + "SET name=%s"
        data = (role.get_name())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, role):

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