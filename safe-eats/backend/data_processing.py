import pandas as pd
import sqlalchemy
from sqlalchemy import create_engine
import os
import re
from nltk.corpus import stopwords
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Database credentials
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# Set up the database connection
engine = create_engine(f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}")

# Preprocessing and cleaning functions
REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))

def text_prepare(text):
    if not isinstance(text, str):
        return text  # or convert to string if necessary: return str(text)
    text = text.lower()
    text = REPLACE_BY_SPACE_RE.sub(' ', text)
    text = BAD_SYMBOLS_RE.sub('', text)
    text = ' '.join(word for word in text.split() if word not in STOPWORDS)
    return text.strip()

def clean_data(data):
    # Convert column names to lowercase
    data.columns = map(str.lower, data.columns)
    # Replace missing values
    data = data.fillna('Unknown')
    # Apply text cleaning to string columns
    for col in data.select_dtypes(include='object').columns:
        data[col] = data[col].apply(text_prepare)
    return data

def load_data(file_path):
    data = pd.read_csv(file_path)
    return data

def save_to_database(data, table_name):
    data.to_sql(table_name, engine, if_exists='replace', index=False)

def main(file_path, table_name):
    data = load_data(file_path)
    cleaned_data = clean_data(data)
    save_to_database(cleaned_data, table_name)
    print("Data has been successfully cleaned, processed, and saved to the database.")

if __name__ == "__main__":
    file_path = "/Users/ethansam/Documents/GitHub/safe_eats_nyc/safe-eats/data/DOHMH_New_York_City_Restaurant_Inspection_Results-2.csv"
    table_name = "restaurant_inspections"
    main(file_path, table_name)
ç