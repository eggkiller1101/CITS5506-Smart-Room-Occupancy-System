import sqlite3
from flask import g
from config import DATABASE

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db:
        db.close()

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS occupancy (
            id INTEGER PRIMARY KEY AUTOINCREMENT, -- auto-incrementing ID
            timestamp TEXT NOT NULL, -- ISO 8601 format
            delta INTEGER NOT NULL, -- change in occupancy(+1 or -1)
            resulting_count INTEGER NOT NULL, -- current occupancy count
            event_type TEXT NOT NULL, -- 'entry' or 'exit'
            sensor_trace TEXT NOT NULL, -- sensor trace enter:"S4->S3" exit:"S3->S4"
            validated_by TEXT NOT NULL -- which sensor finalized the event
        );
    ''')
    db.commit()