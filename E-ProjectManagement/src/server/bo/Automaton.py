from server.bo.Status import Status


class Automaton:

    status_new = Status("New")
    status_accepted = Status("Accepted")
    status_declined = Status("Declined")
    status_inReview = Status("In Review")
    status_reviewCompleted = Status("Review completed")

    def __init__(self):
        self.current_state = Automaton.status_new

    def set_state(self, zustand):
        self.current_state = zustand

    def get_state(self):
        return self.current_state

    def is_in_state(self, zustand):
        return zustand == self.current_state

