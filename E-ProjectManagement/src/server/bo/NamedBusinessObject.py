from server.bo.BusinessObject import BusinessObject as bo

""" in dieser Klasse werden alle BusinessObject die einen Namen besitzen mit dem Attribut name ergänzt"""


class NamedBusinessObject(bo):

    def __init__(self):
        self._name = ""

    def set_name(self, value):
        self._name = value

    def get_name(self):
        return self._name
