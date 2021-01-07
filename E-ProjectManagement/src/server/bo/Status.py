class Status:
    def __init__(self, value="new"):
        self.name = value

    def get_name(self):
        return self.name

    def set_name(self, value):
        self.name = value

    def __str__(self):
        return self.name

    def __eq__(self, other):
        if isinstance(other, Status):
            return self.name == other.name
        else:
            return False