from flask import Flask
import savings_goal
import expense_tracker
import financial_data
import investment_strategy
import user
import fetchloans
import fetchstocks

app = Flask(__name__)
#---------financial data-------------

@app.route('/addIncome')
def addIncocme():

    return addIncome()

@app.route('/addExpense')
def addExpense():

    return addExpense()

@app.route('/updateFinancialData')
def updateFinancialData():

    return updateFinancialData()

@app.route('/getFinancialSummary')
def getFinancialSummary():

    return generatePlan()


# ------------invest---------------------------
@app.route('/generatePlan')
def generatePlan():

    return generatePlan()

@app.route('/updatePlan')
def updatePlan():

    return updatePlan()

@app.route('/getPlanDetails')
def getPlanDetails():

    return getPlanDetails()


# ------expense----------
@app.route('/getExpenseReport')
def getExpenseReport():

    return getExpenseReport()

@app.route('/addSubcategory')
def addSubcategory():

    return addSubcategory()


# --------goal-----------
@app.route('/setGoal')
def setGoal():

    return setGoal()

@app.route('/modifyGoal')
def modifyGoal():

    return modifyGoal()

@app.route('/getGoalStatus')
def getGoalStatus():

    return addSubcagetGoalStatusegory()

# -------register-----------
@app.route('/registerUser')
def registerUser():

    return registerUser()

@app.route('/login')
def login():

    return login()

@app.route('/updateProfile')
def updateProfile():

    return updateProfile()

@app.route('/deleteUser')
def deleteUser():
    
    return deleteUser()

if __name__ == '__main__':
    app.run(debug=True)











