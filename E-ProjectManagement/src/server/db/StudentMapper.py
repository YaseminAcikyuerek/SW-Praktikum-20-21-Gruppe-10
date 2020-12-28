from server.bo.Student import Student
from server.db.Mapper import Mapper


class StudentMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from student")
        tuples = cursor.fetchall()

        for (id, name, matriculation_nr, course_abbr) in tuples:
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_nr, course_abbr FROM student WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if tuples[0] is not None:
            (id, name, matriculation_nr, course_abbr) =tuples[0]
            student = Student()
            student.set_id(id)
            student.set_name(name)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)


        result = student

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, student):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM student")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            student.set_id(maxid[0] + 1)

        command = "INSERT INTO student (id, name, matriculation_nr, course_abbr) VALUES (%s,%s,%s,%s,%s)"
        data = (student.get_id(), student.get_person(),student.get_matriculation_nr(),student.get_course_abbr())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return student

    def update(self, student):

        cursor = self._cnx.cursor()

        command = "UPDATE student " + "SET person_id=%s, ,person=%s, matriculation_nr=%s, course_abbr=%s WHERE id=%s"
        data = (student.get_person(), student.get_id(), student.get_matriculation_nr(), student.get_course_abbr())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, student):

        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_student_by_name(self, name):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, matriculation_nr, course_abbr FROM student WHERE name={}".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, person, matriculation_nr, course_abbr) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_person(person)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)
            result = student

        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_student_by_matriculation_nr(self, matriculation_nr):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, person_id, matriculation_nr, course_abbr FROM student WHERE matriculation_nr={}".format(matriculation_nr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, person, matriculation_nr, matriculation_nr) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_person(person)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(matriculation_nr)
            result = student

        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_student_by_course_abbr(self, course_abbr):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, person_id, matriculation_nr, course_abbr FROM student WHERE course_abbr={}".format(course_abbr)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, person, matriculation_nr, course_abbr) = tuples[0]
            student = Student()
            student.set_id(id)
            student.set_person(person)
            student.set_matriculation_nr(matriculation_nr)
            student.set_course_abbr(course_abbr)
            result = student

        except IndexError:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with StudentMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)














