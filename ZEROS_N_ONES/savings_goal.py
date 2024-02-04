class SavingsGoal:
    def __init__(self):
        self.goal = 0
        self.current_savings = 0
        self.time=0  #months

    def setGoal(self, amount,time):
        """Set a savings target."""
        self.goal = amount
        self.current_savings = 0  # Reset current savings when a new goal is set
        self.time=time

    def modifyGoal(self, new_goal):
        """Change existing savings targets."""
        self.goal = new_goal
        self.time=0
    def getGoalStatus(self):
        """Get current status of savings goals."""
        return {
            'target': self.goal,
            'current_savings': self.current_savings,
            'remaining': self.goal - self.current_savings,
            'goal_reached': self.current_savings >= self.goal
        }