import os

def create_file(file_path, content=""):
    with open(file_path, 'w') as file:
        file.write(content)

def generate_backend_files():
    backend_folder = 'backend'
    os.makedirs(backend_folder, exist_ok=True)

    backend_files = [
        'user.py',
        'financial_data.py',
        'investment_strategy.py',
        'savings_goal.py',
        'expense_tracker.py',
        'investment_portfolio.py',
        'risk_assessment.py',
        'notification_service.py',
        'api_integration.py',
        'app.py'
    ]

    for file_name in backend_files:
        create_file(os.path.join(backend_folder, file_name))

def generate_frontend_files():
    frontend_folder = 'frontend'
    os.makedirs(frontend_folder, exist_ok=True)
    components_folder = os.path.join(frontend_folder, 'components')
    os.makedirs(components_folder, exist_ok=True)

    frontend_files = [
        'Dashboard.js',
        'InputForm.js',
        'InvestmentPlan.js',
        'SavingsGoalTracker.js',
        'ExpenseReport.js',
        'PortfolioOverview.js',
        'RiskAssessmentTool.js',
        'NotificationManager.js',
        'DataVisualization.js',
        'index.js'
    ]

    for file_name in frontend_files:
        create_file(os.path.join(components_folder, file_name))

    create_file(os.path.join(frontend_folder, 'index.js'))

def generate_shared_files():
    shared_folder = 'shared'
    os.makedirs(shared_folder, exist_ok=True)

    shared_files = [
        'api.js',
        'utils.js',
        'constants.js',
        'styles.css'
    ]

    for file_name in shared_files:
        create_file(os.path.join(shared_folder, file_name))

def generate_project_structure():
    generate_backend_files()
    generate_frontend_files()
    generate_shared_files()

    create_file('README.md', 'Project README file.')

if __name__ == "__main__":
    generate_project_structure()
