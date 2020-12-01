from server.bo import BusinessObject as bo
from server.bo import PersonBO as pbo
from server.bo import StudentBO as stbo


class Rating:
    def __init__(self):
        super().__init__()
        self._evaluator = None
        self._to_be_assessed = None
        self._grade =""
        self._passed =""

    def set_evaluator(self,person):
        self._evaluator= person

    def get_evaluator(self):
        return self._evaluator

    def set_to_be_assessed(self,student):
        self._to_be_assessed= student

    def get_to_be_assessed(self):
        return self._to_be_assessed

    def set_grade(self,value):
        self._grade = value

    def get_grade(self):
        return self._grade

    def set_passed(self,value):
        self._passed = value

    def get_passed (self):
        return self._passed


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Ranking()."""
        obj = Ranking()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_evaluator(dictionary["evaluator"])
        obj.set_to_be_assessed(dictionary["to_be_assessed"])
        obj.set_grade(["grade"])
        obj.set_passed(["passed"])
        return obj



