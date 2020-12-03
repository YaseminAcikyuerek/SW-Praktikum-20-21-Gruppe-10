from abc import ABC, abstractmethod
from server.bo.StatusBO import status


class EA(ABC):
    """
    Eine rudimentäre Klasse zur Darstellung von Endlichen Automaten.
    Ein endlicher Automat A ist definitiert als A=(Q,S,d,q0,F), wobei
    Q, die Menge der Zustände,
    S, (eigentlich großes griech. Sigma) das Eingabealphabet,
    d, (eigentlich kleines griech. Delta) die Zustandsübergangsfunktion,
    q0, der anfangs_zustand, Element aus Q sowie
    F, die Menge der Endzustände.
    d ist bei DEA, NEA & e-NEA unterschiedlich definiert. Daher gibt es Subklassen von EA.
    """

    def _init_(self):
        """
        Menge der Zustände.
        Menge der Endzustände.
        Beschreibung der Zustandsübergangsfunktion.
        Der anfangs_zustand
        """
        self.__zustaende = set()
        self.__end_zustaende = set()
        self.__uebergaenge = set()
        self.__anfangs_zustand = None

    def set_anfangszustand(self, status):
        """
        Setzen des anfangs_zustands durch Nennung seines Namens.
        :param status: Name des Zustandes
        :return: None
        """
        q = self.get_zustand(status)
        self.__anfangs_zustand = q

    def get_zustand(self, status):
        """
        Auslesen des Zustandsobjekts, dass durch den Namen bezeichnet wird.
        :param status: Name des Zustandes
        :return: Zustandsobjekt
        """
        if status is not None:
            for q in self.__zustaende:
                if q.get_name()._eq_(status):
                    return q
            q = Zustand(status)
            self.add_zustand(q)
            return q
        return None

    def get_uebergaenge(self):
        """
        Gibt die Übergänge zurück
        :return: Die Übergänge
        """
        return self.__uebergaenge

    def get_zustandsmenge(self):
        """
        Auslesen der Zustände des Automaten.
        :return: die Zustandsmenge
        """
        return self.__zustaende

    def get_endzustaende(self):
        """
        Auslesen der Endzustände des Automaten.
        :return: die Menge der Endzustände
        """
        return self.__end_zustaende

    def add_uebergang(self, von, symbol, nach):
        """
        Hinzufügen eines Zustandsübergangs, wie d(von,symbol)=nach.

        :param von: Name des Ausgangszustands
        :param symbol: beim Übergang zu konsumierendes eingabe_symbol
        :param nach: Name des Folgezustands
        """
        if von is not None and nach is not None:
            if isinstance(von, str) and isinstance(nach, str):
                q1 = self.get_zustand(von)
                q2 = self.get_zustand(nach)
                self.add_uebergang(q1, symbol, q2)
            elif isinstance(von, Zustand) and isinstance(nach, Zustand):
                u = Uebergang(von, symbol, nach)
                self.__uebergaenge.add(u)

    def add_zustand(self, q):
        """
         Hinzufügen eines Zustands zur Menge der Zustände Q.
         :param q: der hinzuzufügende Zustand
        """
        if q is not None:
            if q not in self.__zustaende:
                self.__zustaende.add(q)
        return q

    def add_endzustand(self, zustand):
        """
         Hinzufügen eines Endzustands zur Menge der Endzustände F durch Nennung seines Namens.
         :param zustand: der Name des hinzuzufügenden Zustands
        """
        if zustand is not None:
            if isinstance(zustand, str):
                q1 = self.get_zustand(zustand)
                self.add_endzustand(q1)
            elif isinstance(zustand, Zustand):
                self.add_zustand(zustand)
                if zustand not in self.__end_zustaende:
                    self.__end_zustaende.add(zustand)

    def is_endzustand(self, zustand):
        """
        Überprüfen, ob der benannte Zustand ein Endzustand ist.

        :param zustand: der Name des Zustands, der zu überprüfen ist
        :return True, wenn es sich um einen Endzustand handelt, sonst False
        """
        if zustand is not None:
            if isinstance(zustand, str):
                q = self.get_zustand(zustand)
                if q is not None:
                    return self.is_endzustand(q)
            elif isinstance(zustand, Zustand):
                if zustand is not None:
                    if zustand in self.__end_zustaende:
                        return True
                return False
        return False

    @abstractmethod
    def akzeptiere(self, zeichenkette):
        """
         überprüfen, ob der Automat die übergebene Zeichenkette akzeptiert, d.h., ob er durch die
         Zeichenkette vom anfangs_zustand in einen Endzustand überführt wird.

         :param zeichenkette Die Zeichenkette, die zu prüfen ist.
         :return True, wenn der Automat die Zeichenkette akzeptiert, sonst False
        """
        pass

    def get_anfangszustand(self):
        """
        Auslesen des anfangs_zustands.
        :return der anfangs_zustand
        """
        return self.__anfangs_zustand

    def get_alphabet(self):
        """
        Auslesen des Alphabets des Automaten. Dieses wird meistens mit dem griechischen Großbuchstaben
        Sigma bezeichnet. Das Alphabet wird hier anhand sämtlicher Zustandsübergänge bestimmt.

        :return das Alphabet des Automaten als Menge von Zeichen.
        """
        ergebnis = set()

        """
        Wir durchlaufen sämliche Zustandsübergänge des Automaten und bestimmen jeweils deren
        eingabe_symbol. Sofern das Symbol noch nicht aufgenommen wurde, wird es ins Ergebnis
        übernommen. Hinweis: Diese Prüfung ist erforderlich, da ein eingabe_symbol bei einer
        Vielzahl von Zustandsübergängen Verwendung finden kann. 
        """
        for u in self.__uebergaenge:
            if u.eingabe_symbol not in ergebnis:
                ergebnis.add(u.eingabe_symbol)
        return ergebnis

    def _str_(self):
        """
        Jede selbstentwickelte Klasse sollte eine eigene _str_()-Methode implementieren. Auf diese
        Weise können Sie eine eigene textuelle Darstellung Ihrer Objekte erzeugen. Die
        Anwendungsmöglichkeiten sind vielfältig. So greift etwa der Debugger auf diese Methode zu,
        wenn Sie einzelne Objekte beobachten möchten. Außerdem können Sie z.B. mit print() Ihre
        Objekte schnell und umkompliziert ausgeben.
        """
        ergebnis = ""

        ergebnis += "A=(Q,Sigma,delta, anfangs_zustand, F)\nmit\n"
        ergebnis += "Q="
        ergebnis += " ".join(map(str, self.__zustaende))
        ergebnis += "\n"

        ergebnis += "Sigma="
        ergebnis += " ".join(map(str, self.get_alphabet()))
        ergebnis += "\n"

        ergebnis += "anfangs_zustand="
        ergebnis += str(self.get_anfangszustand())
        ergebnis += "\n"

        ergebnis += "Menge der Endzustände, F="
        ergebnis += " ".join(map(str, self.__end_zustaende))
        ergebnis += "\n"

        return ergebnis


class Uebergang:
    """
    Hilfsklasse, die verwendet wird, um Zustandsübergänge zu repräsentieren. Ein Zustandsübergang ist
    definiert als Teil der Zustandsübergangsfunktion delta. Man kann schreiben: delta(q1,a)=q2. Dabei
    stellt q1 den Zustand dar, in dem sich der Automat befindet, wenn er das eingabe_symbol a
    konsumiert. Infolgedessen nimmt der Automat den Zustand q2 ein. Eine Instanz der Klasse Uebergang
    kann als eine Kante im Zustandsübergangsdiagramm des Automaten interpretiert werden.
    """

    def _init_(self, von=None, eingabe="", nach=None):
        """
        Zustand, in dem sich der Automat zunächst befindet, wenn er das eingabe_symbol verarbeitet.
        Zustand, in den der Automat übergeht, wenn er das eingabe_symbol verarbeitet.
        Das eingabe_symbol
        """
        self.von = von
        self.eingabe_symbol = eingabe
        self.nach = nach

    def _str_(self):
        """
        überführen des Zustandsübergangs in eine Stringdarstellung ähnlich delta(q1,a)=q2.
        """
        return "delta(" + str(self.von) + "," + self.eingabe_symbol + ")=" + str(self.nach)