from server.bo.PersonBO import PersonBO
from server.db.Mapper import Mapper


class StudentMapper(Mapper):



    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Konten.

        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, owner from accounts")
        tuples = cursor.fetchall()

        for (id, owner) in tuples:
            account = Account()
            account.set_id(id)
            account.set_owner(owner)
            result.append(account)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_Student_id(self, Studnet_id):
        """Auslesen aller Konten eines durch Fremdschlüssel (Kundennr.) gegebenen Kunden.

        :param owner_id Schlüssel des zugehörigen Kunden.
        :return Eine Sammlung mit Account-Objekten, die sämtliche Konten des
                betreffenden Kunden repräsentieren.
        """






    def find_by_key(self, key):



    def insert(self, account):


    def update(self, account):


    def delete(self, account):


    def find_by_creation_time(self, object):


     def find_by_name(self, object):



    if (__name__ == "__main__"):
        with AccountMapper() as mapper:
            result = mapper.find_all()
            for p in result:
                print(p)