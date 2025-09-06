# db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def get_session(db_url):
    engine = create_engine(db_url, pool_size=10, max_overflow=20)
    return sessionmaker(bind=engine)