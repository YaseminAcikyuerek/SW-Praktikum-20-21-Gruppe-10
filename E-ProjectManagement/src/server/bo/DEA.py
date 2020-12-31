from server.bo.BusinessObject import BusinessObject
from server.bo.Status import Status

class DEA (BusinessObject):
    """
     Eine rudimentäre Klasse zur Darstellung von Deterministischen Endlichen Automaten (DEA).
     Ein DEA A ist definitiert als A=(Q,S,d,q0,F).
     d ist definiert als d:QxSigma->Q. Das heißt, dass zu einem aktuellen Zustand und einem
     eingabe_symbol ein eindeutiger Nachfolgezustand bestimmt werden kann, sofern dieser existiert.
     Aufgrund des eindeutig bestimmbaren Folgezustands wird diese Klasse von Automaten als
     deterministisch bezeichnet.
     """

    def delta(self, status, symbol):
        """
        Zur komfortablen Nutzung bieten wir die Angabe von Zuständen anhand ihres Namens an. Dies wird
        natürlich im Hintergrund abgebildet auf Zustands-Objekte.
        :param status: Der Zustand
        :param symbol: Das Eingabesymbol
        :return: Folgezustand
        """
        if isinstance(status, Status):
            """
            Wir suchen in allen Zustandsübergängen nach einem Übergang, der den Argumenten dieses
            Methodenaufrufs entspricht. Der damit in Verbindung stehende Folgezustand wird dann
            zurückgegeben.
            """
            for u in self.get_uebergaenge():
                if u.von is status and u.eingabe_symbol is symbol:
                    """
                    Die "Aktivierung" des ausgewählten Zustandsübergangs wird signalisiert.

                    Hinweis: Derartige Log-Ausgaben sind üblich aber nicht professionell! Eigentlich
                    sollte hier auf ein Logging-Framework wie etwa logging
                    zurückgegriffen werden. Dies würde hier aber zu weit gehen.
                    """
                    print("Aktiviere " + str(u))
                    return u.nach
        elif isinstance(status, str):
            q = self.get_zustand(status)
            return self.delta(q, symbol)
        return None  # None bedeutet: Folgezustand nicht definiert!

    def delta_dach(self, status, zeichenkette):
        """
         Auf Zeichenketten erweiterte Zustandsübergangsfunktion. "delta_dach" beantwortet die Frage, in
        welchem Zustand sich der DEA befindet, nachdem er die gesamte übergeben Zeichenkette
        konsumiert hat. Dabei geht er von einem auch als Argument übergebenen Basiszustand aus.
        :param status: Ausgangszustand
        :param zeichenkette: die zu verarbeitenden eingabe_symbole in Form eines String
        :return: Zustand, in dem sich der Automat nach Abarbeitung der Zeichenkette befindet.
        """
        if len(zeichenkette) > 0:
            if isinstance(status, Status):
                w = zeichenkette[0: len(zeichenkette) - 1]
                a = zeichenkette[len(zeichenkette) - 1]
                """
                Der Aufruf der Methode und ihre Argumente werden aus didaktischen Gründen ausgegeben.

                Hinweis: Derartige Log-Ausgaben sind üblich aber nicht professionell! Eigentlich sollte
                hier auf ein Logging-Framework zurückgegriffen werden. Dies würde hier aber zu weit gehen.
                """
                print("Rufe auf: delta_dach(" + str(status) + "," + str(zeichenkette) + ")")
                """
                Rekursiver Aufruf von delta_dach mit gekürzter Eingabe. Ergebnis dieses Aufrufs ist ein
                Zustand, der als Eingabe für den Aufruf von delta verwendet wird.
                """
                return self.delta(self.delta_dach(status, w), a)
            elif isinstance(status, str):
                q = self.get_zustand(status)
                return self.delta_dach(q, zeichenkette)
        else:
            # Ohne Eingabe (len(zeichenkette)>0) bleiben wir einfach im Zustand q (Argument der Methode).
            return status

    def akzeptiere(self, zeichenkette):
        """
        Abfragen, ob der Automat die übergebene Zeichenkette akzeptiert.
        :param zeichenkette: die zu überprüfende Zeichenkette
        :return: True, wenn die Zeichenkette gültig ist, sonst False
        """
        if zeichenkette is not None:
            q = self.prozessiere(zeichenkette)
            # Akzeptieren bedeutet, durch Bearbeitung der Zeichenkette einen Endzustand zu erreichen.
            if self.is_endzustand(q):
                return True
        return False

    def prozessiere(self, zeichenkette):
        """
        Prozessieren einer übergebenen Zeichenkette mit dem Ziel, zu bestimmen, in welchem Zustand sich der
        Automat hiernach befindet.

        :param zeichenkette Die Zeichenkette, die zu prozessieren ist.
        :return Der Zustand, in dem sich der Automat befindet, nachdem er die Zeichenkette bearbeitet hat.
        """
        q0 = self.get_anfangszustand()
        return self.delta_dach(q0, zeichenkette)

    def _str_(self):
        # Wir ergänzen die _str_()-Methode der Superklasse durch die Ausgabe der Zustandsübergangsfunktion, delta.
        ergebnis = ""
        # Das Ergebnis von _str_() der Superklassen benutzen/anhängen.
        ergebnis += EA._str_(self)
        # Die Zustandsübergänge aufnehmen.
        for u in self.get_uebergaenge():
            ergebnis += str(u)

        return ergebnis