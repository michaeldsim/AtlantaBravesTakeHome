import pandas as pd

def load_data(file_path='../BattedBallData.xlsx'):
    df = pd.read_excel(file_path, engine='openpyxl', sheet_name='Data')
    return df