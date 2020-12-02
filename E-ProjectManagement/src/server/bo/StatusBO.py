class Status:

        def __init__(self, status):
            """
            Anlegen eines Zustands mit der übergebenen Bezeichnung.
            :param n: die Bezeichnung des Zustands
            """
            self.__status = ["new", "in process","declined","approved","rating completed"]

        def get_status(self):
            """
            Auslesen des Namens des Zustands.
            :return:  der Name
            """
            return self.__status

        def __str__(self):
            """
            Rückgabe des Zustands als String-Darstellung.
            """
            return self.__status

        def __hash__(self):
            return hash(self.__status)

        def __eq__(self, other):
            """
            Diese Methode prüft die Gleichheit zweier Instanzen. Die eine ist self
            und die andere ist als Argument zu übergeben.
            """
            if other is not None and isinstance(other, Status):
                if self.__status is not None and other.get_status() is not None:
                    return self.__status.__eq__(other.get_status())
                else:
                    return False
            else:
                return False
