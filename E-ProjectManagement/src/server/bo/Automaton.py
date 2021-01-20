from server.bo.Status import Status


class Automaton:

    status_new = Status("Neu")
    status_accepted = Status("Akzeptiert")
    status_declined = Status("Abgelehnt")
    status_inProcess = Status("In Bewertung")
    status_ratingProcessCompleted = Status("Bewertung abgeschlossen")

    def __init__(self):
        self.current_state = Automaton.status_new

    def set_state(self, zustand):
        self.current_state = zustand

    def get_state(self):
        return self.current_state

    def is_in_state(self, zustand):
        return zustand == self.current_state

