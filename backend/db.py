# db.py
import sqlite3
from flask import g
from config import DB_PATH

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS occupancy (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            delta INTEGER NOT NULL,
            resulting_count INTEGER NOT NULL,
            sensor_trace TEXT,
            validated_by TEXT,
            event_type TEXT
        );
    ''')
    db.commit()