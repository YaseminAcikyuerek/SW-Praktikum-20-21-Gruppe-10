from server.bo.BusinessObject import BusinessObject as bo


class Rating(bo):
    def __init__(self):
        super().__init__()
        self._project = None
        self._evaluator = None
        self._to_be_assessed = None
        self._grade = 0.0
        self._passed = True

    def set_project(self, project):
        self._project = project

    def get_project(self):
        return self._project

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
        """Umwandeln eines Python dict() in ein Rating()."""
        obj = Rating()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_project(dictionary["project"])
        obj.set_evaluator(dictionary["evaluator"])
        obj.set_to_be_assessed(dictionary["to_be_assessed"])
        obj.set_grade(dictionary["grade"])
        obj.set_passed(dictionary["passed"])
        return obj



